// @ts-check
import { defineConfig } from "astro/config";

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
