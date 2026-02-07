import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 5000,
    proxy: {
      "/users": "http://localhost:5001",
      "/reviewers": "http://localhost:5001",
    },
  },
});
