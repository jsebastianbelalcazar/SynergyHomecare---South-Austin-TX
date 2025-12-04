import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Setting base to './' ensures that assets are loaded relatively.
  // This is critical for GitHub Pages which often serves from a subdirectory (e.g. /repo-name/).
  base: './',
  build: {
    outDir: 'dist',
  }
});