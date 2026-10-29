import { defineConfig, fontProviders } from "astro/config";

// Fontsource's variable font files, served through Astro's fonts API so it can generate
// metric-matched fallbacks: text set in the fallback occupies the same space as the real
// font, so nothing reflows when the web font arrives.
const LATIN =
  "U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD";
// Latin Extended covers the Nation names in the land acknowledgement (e.g. Sḵwx̱wú7mesh).
const LATIN_EXT =
  "U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF";

const fontsource = (pkg, file, weight) =>
  ["latin", "latin-ext"].map((subset) => ({
    src: [`@fontsource-variable/${pkg}/files/${file}-${subset}-wght-normal.woff2`],
    weight,
    style: "normal",
    unicodeRange: [subset === "latin" ? LATIN : LATIN_EXT],
  }));

export default defineConfig({
  site: "https://www.watersedgemassage.com",
  devToolbar: { enabled: false },
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Cormorant Garamond",
      cssVariable: "--font-serif",
      fallbacks: ["Georgia", "serif"],
      options: { variants: fontsource("cormorant-garamond", "cormorant-garamond", "300 700") },
    },
    {
      provider: fontProviders.local(),
      name: "Jost",
      cssVariable: "--font-sans",
      fallbacks: ["Arial", "sans-serif"],
      options: { variants: fontsource("jost", "jost", "100 900") },
    },
  ],
});
