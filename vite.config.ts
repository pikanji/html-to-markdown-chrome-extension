import { defineConfig } from 'vite'
import { join, resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isProduction = mode === 'production';
  
  return {
    publicDir: resolve(__dirname, 'public'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      minify: isProduction ? 'terser' : false,
      terserOptions: isProduction ? {
        compress: {
          drop_console: true, // Remove console.* statements in production
          drop_debugger: true // Remove debugger statements in production
        }
      } : undefined,
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
  }
})
