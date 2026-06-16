import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://samramseyer.com",
  base: "/docs/",
  output: "static",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
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
  },
});
