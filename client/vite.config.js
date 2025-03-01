import path from "path";
import { fileURLToPath } from "url"; // Import this to convert import.meta.url
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Convert import.meta.url to a directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
