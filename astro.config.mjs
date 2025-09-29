import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://docs.astro.build/en/guides/integrations-guide/
export default defineConfig({
  integrations: [tailwind(), mdx()],
  output: 'static',
  site: 'https://example.com'
});
