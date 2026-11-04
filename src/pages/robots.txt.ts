import type { APIRoute } from "astro";

// Every crawler is welcome, including AI search and assistant crawlers, so the practice
// can show up in their answers.
export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL("/sitemap-index.xml", site)}\n`, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
