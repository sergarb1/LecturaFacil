import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: '/LecturaFacil/',
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['fonts/*.woff2', 'icons/*.svg'],
      manifest: {
        name: 'LecturaFacil - Editor de texto inclusivo',
        short_name: 'LecturaFacil',
        description: 'Editor de texto accesible para personas con dislexia. Colores, pictogramas y lectura en voz alta.',
        theme_color: '#7c3aed',
        background_color: '#fcf9ec',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'any',
        lang: 'es',
        categories: ['education', 'accessibility'],
        icons: [
          { src: 'icons/icon-192x192.svg', sizes: '192x192', type: 'image/svg+xml', purpose: 'any maskable' },
          { src: 'icons/icon-512x512.svg', sizes: '512x512', type: 'image/svg+xml', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}']
      }
    })
  ]
})
