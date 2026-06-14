import { resolve } from "node:path";
import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import {
  buildCrawlerFallbackHtml,
  buildJsonLd,
  buildSeoHeadTags,
  seo,
} from "./src/config/seo";

function injectSeoPlugin(): Plugin {
  return {
    name: "inject-seo",
    transformIndexHtml(html) {
      const seoTags = buildSeoHeadTags();
      const jsonLd = buildJsonLd();
      const crawlerFallback = buildCrawlerFallbackHtml();

      return html
        .replace("<!-- seo:tags -->", seoTags)
        .replace(
          "<!-- seo:json-ld -->",
          `<script type="application/ld+json">${jsonLd}</script>`,
        )
        .replace(
          "<!-- seo:crawler-fallback -->",
          `<noscript>${crawlerFallback}</noscript>`,
        )
        .replace(
          "<title>Sam Ramseyer | Builder & Full Stack Developer</title>",
          `<title>${seo.title}</title>`,
        );
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), injectSeoPlugin()],
  // Relative paths work for custom domains, github.io/Sam-Portfolio/, and Live Server.
  base: "./",
  build: {
    rollupOptions: {
      input: resolve(__dirname, "app.html"),
    },
  },
  server: {
    open: "/app.html",
    proxy: {
      "/api/github": {
        target: "https://api.github.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/github/, ""),
        headers: {
          "User-Agent": "Sam-Portfolio",
        },
      },
    },
  },
});
