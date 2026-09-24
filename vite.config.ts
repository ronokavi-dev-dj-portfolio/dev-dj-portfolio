import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Base must match the GitHub Pages repo name so built asset paths resolve correctly.
// e.g. https://ronokavi.github.io/dev-dj-portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/dev-dj-portfolio/',
});
