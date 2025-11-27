import {defineConfig} from 'tsup';

export default defineConfig({
	entry: {
		'use-stdout-dimensions': 'src/useStdoutDimensions.tsx',
		'use-box-model': 'src/useBoxModal.tsx',
		'use-full-screen': 'src/useFullScreen.tsx',
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





