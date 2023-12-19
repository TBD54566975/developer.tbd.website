import nodePolyfills from 'vite-plugin-node-stdlib-browser';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
  devServer: {
    port: 5175,
  },
  vite: {
    plugins: [nodePolyfills()],
  },
});
