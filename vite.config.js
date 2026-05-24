import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [svelte(), tailwindcss()],
  // This MUST match the name in your URL exactly!
  base: "/okulas-mokula-hi-hi-hih-ih/",
});
