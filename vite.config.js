import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import replace from '@rollup/plugin-replace';
import  dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    replace({
      'process.env.VITE_API_KEY': JSON.stringify(process.env.VITE_API_KEY),
      'process.env.VITE_API_HOSt': JSON.stringify(process.env.VITE_API_HOST),
       preventAssignment: true,
    }),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFilesAfterEnv: ['./src/test/setupTest.js'], 
    css: true,
  }
});