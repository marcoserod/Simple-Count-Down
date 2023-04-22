import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from "vite-plugin-pwa";

const manifest = {
    name: "Rest & Set Counter",
    theme_color: "#000000",
    background_color: "#FFFFFF",
    display: "standalone",
    scope: "/",
    start_url: "/"
  }


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),VitePWA(manifest)],
  server: {
    watch: {
      usePolling: true,
    },
  },
})
