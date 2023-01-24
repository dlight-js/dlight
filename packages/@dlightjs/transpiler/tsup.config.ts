import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ["src/index.ts"],
    clean: true,
    dts: true,
    outDir: "dist",
    format: ['cjs'],
    minify: true
});