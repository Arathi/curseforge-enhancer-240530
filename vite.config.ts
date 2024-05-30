import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import monkey, { cdn } from 'vite-plugin-monkey';
import { resolve } from 'node:path';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 24653,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, 'src'),
    },
  },
  plugins: [
    react(),
    monkey({
      entry: 'src/main.tsx',
      userscript: {
        name: 'CurseForge Enhancer',
        author: 'Arathi of Nebnizilla',
        icon: 'https://vitejs.dev/logo.svg',
        namespace: 'com.undsf.tmus.cfe',
        match: ['https://www.curseforge.com/minecraft/search*'],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr('React', 'umd/react.production.min.js'),
          'react-dom': cdn.jsdelivr(
            'ReactDOM',
            'umd/react-dom.production.min.js',
          ),
        },
      },
    }),
  ],
});
