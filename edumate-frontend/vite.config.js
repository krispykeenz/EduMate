import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(() => {
  const isDemoMode = process.env.VITE_DEMO_MODE === 'true'

  return {
    // GitHub Pages serves from a repo subpath; use relative asset paths for demo builds.
    base: isDemoMode ? './' : '/',
    plugins: [react()]
  }
})
