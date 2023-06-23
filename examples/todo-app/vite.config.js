import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    NodeGlobalsPolyfillPlugin({ buffer: true, process: true }),
    NodeModulesPolyfillPlugin(),
  ],
  optimizeDeps: {
    esbuildOptions: {
      target    : 'esnext',
      supported : { 
        bigint: true 
      },
      define: {
        global: 'globalThis',
      }
    }
  },
  resolve: {
    alias: {
      // by node-globals-polyfill
      events: 'rollup-plugin-node-polyfills/polyfills/events',
    }
  },
  build: {
    rollupOptions: {
      // for production
      plugins: [nodePolyfills()],
    },
    target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14']
  }
});