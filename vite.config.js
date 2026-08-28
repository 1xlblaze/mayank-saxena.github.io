import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  base: "/mayank-saxena.github.io/",
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "og-image.jpg", "Mayank-August-2026-2.pdf"],
      manifest: {
        name: "Mayank Saxena — Senior Software Engineer",
        short_name: "Mayank Saxena",
        description: "Distributed systems, backend architecture, and agentic AI.",
        theme_color: "#070b10",
        background_color: "#070b10",
        display: "standalone",
        start_url: "/mayank-saxena.github.io/",
        scope: "/mayank-saxena.github.io/",
        icons: [
          { src: "favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any maskable" },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,woff2}"],
        navigateFallback: "/mayank-saxena.github.io/index.html",
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber"],
          charts: ["chart.js", "react-chartjs-2"],
          motion: ["framer-motion"],
        },
      },
    },
  },
  server: {
    watch: { usePolling: true, interval: 100 },
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});
