import { defineConfig } from "vite";

export default defineConfig({
  server: {
    port: 5000,
  },
  build: {
    target: "es2022",
  },
});
