import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// the only Node global this config needs (avoids pulling in @types/node)
declare const process: { env: Record<string, string | undefined> }

// ngrok tunnels, for previewing on a phone
const tunnelHosts = ['.ngrok-free.app', '.ngrok-free.dev', '.ngrok.app', '.ngrok.dev']

/**
 * Link previews (WhatsApp, Facebook…) need absolute URLs.
 * Netlify sets `URL` automatically for Git deploys; set `SITE_URL` yourself
 * when building locally for a manual (drag-and-drop) deploy.
 */
function siteUrl(): Plugin {
  const url = (process.env.SITE_URL || process.env.URL || '').replace(/\/$/, '')
  return {
    name: 'site-url',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', url),
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), siteUrl()],
  server: { allowedHosts: tunnelHosts },
  preview: { allowedHosts: tunnelHosts },
})
