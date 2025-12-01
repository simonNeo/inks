import {defineConfig} from 'tsup';

export default defineConfig({
	entry: {
		index: 'src/index.tsx',
	},
	format: ['esm'],
	bundle: true,
	splitting: false,
	sourcemap: false,
	dts: false,
	clean: true,
	outDir: 'dist',
	outExtension({ format }) {
		return {
			js: `.mjs`,
		};
	},
});





