import { defineConfig } from "astro/config";
import cloudflare from "@astrojs/cloudflare";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  // Server-side rendering for Cloudflare Workers
  output: "server",

  // Cloudflare adapter configuration
  adapter: cloudflare({
    // Enable platform proxy for local development with bindings
    platformProxy: {
      enabled: true,
    },
  }),

  // Svelte integration for interactive islands + Tailwind
  integrations: [
    svelte(),
    tailwind({
      // Use a custom config file
      configFile: "./tailwind.config.mjs",
    }),
  ],

  // Vite configuration
  vite: {
    resolve: {
      // Ensure proper resolution of Svelte 5
      conditions: ["svelte", "browser"],
    },
  },
});
