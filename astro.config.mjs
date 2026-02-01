import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import svelte from '@astrojs/svelte';

export default defineConfig({
  // Server-side rendering for Cloudflare Workers
  output: 'server',

  // Cloudflare adapter configuration
  adapter: cloudflare({
    // Enable platform proxy for local development with bindings
    platformProxy: {
      enabled: true
    }
  }),

  // Svelte integration for interactive islands
  integrations: [svelte()],

  // Vite configuration
  vite: {
    resolve: {
      // Ensure proper resolution of Svelte 5
      conditions: ['svelte', 'browser']
    }
  }
});
