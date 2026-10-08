import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // The manifest maps each route to its chunks for prerendering; scripts/prerender.mjs removes it from dist.
  build: { manifest: true },
})
