// @ts-check
import { defineConfig } from "astro/config";

const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  site: "https://christinareilly.com",
  vite: {
    server: {
      port: 4321,
      strictPort: true,
    },
  },
});
