// Handles the contact form. Everything else on the site is a static file served from
// dist/ before this Worker runs, so only requests that match no file reach it.
interface Env {
  CONTACT_EMAIL: SendEmail;
  CONTACT_FROM: string; // on a domain onboarded to Cloudflare Email Sending
  CONTACT_TO: string; // a verified destination address in the Cloudflare account
  TURNSTILE_SECRET: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== "/api/contact") return new Response("Not found", { status: 404 });
    if (request.method !== "POST") return new Response(null, { status: 405, headers: { Allow: "POST" } });

    const form = await request.formData();
    const field = (key: string) => String(form.get(key) ?? "").trim();
    const name = field("name").replace(/\s+/g, " ");
    const email = field("email");
    const message = field("message");
    if (!name || name.length > 200 || !EMAIL_PATTERN.test(email) || email.length > 254 || !message || message.length > 5000) {
      return new Response("Invalid form", { status: 400 });
    }

    // Turnstile tokens are single use; an unset secret fails verification, so the form fails closed.
    const check = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({
        secret: env.TURNSTILE_SECRET ?? "",
        response: field("cf-turnstile-response"),
        remoteip: request.headers.get("CF-Connecting-IP") ?? "",
      }),
    });
    const { success } = await check.json<{ success: boolean }>();
    if (!success) return new Response("Verification failed", { status: 403 });

    try {
      await env.CONTACT_EMAIL.send({
        from: { name: "Water's Edge website", email: env.CONTACT_FROM },
        to: env.CONTACT_TO,
        replyTo: { name, email },
        subject: `Website message from ${name}`,
        text: `${message}\n\n${name} <${email}>\nSent from the contact form at ${url.origin}`,
      });
    } catch (error) {
      const { code, message: reason } = error as { code?: string; message?: string };
      console.error("Contact email failed", code, reason);
      return new Response("Could not send", { status: 502 });
    }
    return new Response(null, { status: 204 });
  },
};
