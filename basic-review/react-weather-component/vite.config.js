import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // If you are running into issues with MIME type errors, try setting the following:
    mimeTypes: {
      '.js': 'application/javascript',
    },
  },
})
