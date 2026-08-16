import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { compression } from 'vite-plugin-compression2';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Pre-compresses JS/CSS assets to .gz at build time so the server can
    // send smaller payloads without doing the work per-request.
    compression({ algorithm: 'gzip' }),
  ],
  build: {
    target: 'es2018',
    sourcemap: false,
    // Split vendor code from app code so the (rarely-changing) React runtime
    // is cached separately from your own code, which changes more often.
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
