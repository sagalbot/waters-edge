import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One Markdown file per focus area. The body is Alexis's own text about the
// benefits of treatment; it shows on the Services page once written.
const focus = defineCollection({
  loader: glob({ pattern: "*.md", base: "./src/content/focus" }),
  schema: z.object({ title: z.string(), order: z.number() }),
});

export const collections = { focus };
