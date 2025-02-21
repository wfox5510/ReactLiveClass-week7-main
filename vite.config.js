import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/ReactLiveClass-week7-main/",
  plugins: [react()],
})
