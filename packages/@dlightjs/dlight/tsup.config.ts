import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ["src/index.js"],
    clean: true,
    dts: true,
    outDir: "dist",
    format: ['cjs', 'esm'],
    minify: true
});