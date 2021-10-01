import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
/**
 * @type {import('vite').UserConfig}
 */
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../blogger/client',
    sourcemap: false
  },
  server: {
    port: 8080
  }
})
