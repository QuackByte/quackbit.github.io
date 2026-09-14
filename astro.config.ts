import { defineConfig } from 'astro/config';

// Served by the Quackbyte org site at https://quackbyte.dev/quackbit/
export default defineConfig({
  site: 'https://quackbyte.dev',
  base: '/quackbit',
  trailingSlash: 'always',
  output: 'static',
});
