import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: { port: 5173, strictPort: true },
  build: { chunkSizeWarningLimit: 700 },   // three.js is its own lazy chunk (~130 KB gzipped)
});
