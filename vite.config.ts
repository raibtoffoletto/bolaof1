import { defineConfig } from 'vite';

export default defineConfig({
  root: __dirname,

  build: {
    emptyOutDir: true,
    target: 'node22',

    lib: {
      entry: './src/main.ts',
      name: 'index',
      fileName: 'index',
      formats: ['es'],
    },

    rollupOptions: {
      external: ['node:sqlite', 'discord.js'],
      output: {
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].js',
        dir: 'dist',
      },
    },
  },
});
