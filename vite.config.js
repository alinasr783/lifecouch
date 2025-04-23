import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'My PWA App',
        short_name: 'PWA App',
        description: 'My awesome Progressive Web App!',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
      }
    })
  ],
  server: {
    allowedHosts: ['8248b427-32ad-4845-b5b8-66d22f402668-00-1mbutl8vvgq0m.spock.replit.dev']
  }
})