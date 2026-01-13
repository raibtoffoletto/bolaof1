import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  format: ['esm'],
  target: 'node24',
  bundle: true,
  clean: true,
  splitting: true,
  sourcemap: false,
  dts: false,
});
