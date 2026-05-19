import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

export default defineConfig({
  site: "https://estremor.com",
  integrations: [
    tailwind(),
    sitemap({
      changefreq: "monthly",
      priority: 0.7,
      lastmod: new Date(),
    }),
  ],
  output: "hybrid",
  adapter: vercel(),
  devToolbar: {
    enabled: false,
  },
});
