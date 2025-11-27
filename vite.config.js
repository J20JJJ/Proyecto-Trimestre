import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: './', 
  plugins: [
    vue(),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  // 👇👇👇 AGREGAR ESTA PARTE
  test: {
    environment: 'jsdom',       
    setupFiles: './tests/setup.js', 
    globals: true                
  }
})
