import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server:{
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'https://api-test.azadlogistics.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Remove `/api` prefix
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
  },
})
