import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// The site is served from the repository root by GitHub Pages,
// so the production build is written one folder up (the repo root).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/",
  build: {
    outDir: "..",
    emptyOutDir: false,
    assetsDir: "assets",
  },
})
