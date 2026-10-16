import { defineConfig } from "astro/config";
// SITE_URL is the real deployed origin; BASE_PATH supports GitHub project Pages.
export default defineConfig({
  site: process.env.SITE_URL || undefined,
  base: process.env.BASE_PATH || "/",
  output: "static",
  server: { port: 3000, host: true },
});
