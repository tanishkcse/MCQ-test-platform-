import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':'https://codepilot-9q4e.onrender.com',
    },
  },
  plugins: [react()],
})
