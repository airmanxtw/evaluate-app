import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "evaluate-app.0.1.0.js",
      },
    },
  },

  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      compilerOptions: {
        customElement: true,
      },      
    }),     
  ],  
});
