import { defineConfig } from 'vite'
import { join, resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  publicDir: resolve(__dirname, 'public'),
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        "popup/popup": join(__dirname, 'src/popup/popup.ts'),
        "content": join(__dirname, 'src/content/content.ts'),
      },
      output: {
        entryFileNames: '[name].js'
      },
    }
  },
  resolve: {
    alias: {
      '@src': resolve(__dirname, 'src')
    }
  },
})
