import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // ADD THIS SERVER BLOCK:
  server: {
    host: '0.0.0.0',
    port: 5173,
    cors: true,
    origin: 'http://localhost:5173',
    allowedHosts: ['host.docker.internal', 'localhost', 'backend.ddev.site'],
    strictPort: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    outDir: '../assets', 
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
})