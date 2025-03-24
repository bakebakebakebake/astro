import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightThemeRapide from 'starlight-theme-rapide'

export default defineConfig({
  integrations: [
    starlight({
      plugins: [starlightThemeRapide()],
      title: 'My Docs',
    }),
  ],
})