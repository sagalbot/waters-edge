import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per focus area, in Alexis's words. The summary shows on the
// homepage and the Services page; the body is the long version, only on the focus area's
// own landing page (/services/<file name>), whose h1 and title tag come from `headline`
// and meta description from `description`.
const focus = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/focus" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    headline: z.string(),
    description: z.string(),
    // Which treatments and prices the landing page shows (see site.ts).
    rates: z.enum(["massage", "pregnancy"]).default("massage"),
    order: z.number(),
    summary: z.string(),
  }),
});

export const collections = { focus };
