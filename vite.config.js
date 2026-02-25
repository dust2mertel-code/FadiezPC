import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => ({
  base: process.env.PAGES === "1" ? "/FadiezPC/" : "/",
  plugins: [react()],
}));