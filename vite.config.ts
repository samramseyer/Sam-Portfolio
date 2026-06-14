import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // GitHub Pages project site: /Sam-Portfolio/. Local Live Server: relative ./ paths.
  base: isGitHubPages ? "/Sam-Portfolio/" : "./",
  server: {    proxy: {
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
