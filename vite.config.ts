import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3005,
      host: '0.0.0.0',
    },
    plugins: [react(), tailwindcss()],
    build: {
      target: 'es2020',
      cssCodeSplit: true,
      minify: 'esbuild',
      reportCompressedSize: false,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          // Only split what's truly needed by the initial entry.
          // three/@react-three/drei MUST stay out of manualChunks so Rollup
          // keeps them inside the dynamically imported QuantumScene chunk.
          manualChunks(id) {
            if (!id.includes('node_modules')) return;
            if (id.includes('react-router') || id.includes('react-helmet')) return 'vendor-router';
            if (id.match(/node_modules\/(react|react-dom|scheduler)\//)) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-ui';
            // three.js, @react-three/* intentionally NOT chunked here:
            // they are consumed only by dynamic import in App.tsx -> QuantumScene.
          },
        },
      },
    },
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
  };
});
