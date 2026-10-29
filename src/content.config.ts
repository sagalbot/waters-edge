import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per focus area, in Alexis's words. The summary shows on the
// homepage; the body is the long version on the Services page.
const focus = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/focus" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    order: z.number(),
    summary: z.string(),
  }),
});

export const collections = { focus };
