import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ['chrome109', 'edge112', 'firefox102', 'safari15.6', 'ios15.6']
  },
  define: {
    global: 'globalThis'
  },
  plugins: [vue(), nodePolyfills()],
});
