import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative paths work for custom domains, github.io/Sam-Portfolio/, and Live Server.
  base: "./",
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
});
