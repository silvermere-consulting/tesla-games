// astro.config.mjs
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap"; // <-- you must import it

export default defineConfig({
  site: "https://tesla-games.netlify.app", // required for sitemap
  integrations: [mdx(), sitemap()],
});
