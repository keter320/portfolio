// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { metaImagesPlugin } from "./vite-plugin-meta-images";

export default defineConfig({
  // 🔸 1. УКАЖИ ИМЯ СВОЕГО РЕПОЗИТОРИЯ ЗДЕСЬ (например, "/portfolio/")
  base: "/keter_portfolio_1",

  plugins: [
    react(),
    tailwindcss(),
    metaImagesPlugin(),
    // Replit-плагины отключены для сборки вне Replit
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    // 🔸 2. GitHub Pages требует, чтобы файлы были в ./dist (не ./dist/public)
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
  },
  server: {
    host: "0.0.0.0",
    allowedHosts: true,
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});