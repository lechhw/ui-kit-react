import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

import pkg from './package.json';

const externalDependencies = [...Object.keys(pkg?.peerDependencies || {}), ...Object.keys(pkg?.devDependencies || {})];

export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
        }),
    ],
    build: {
        lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            formats: ['es'],
        },
        rollupOptions: {
            // external: ['react', 'react-dom'],
            external: ['react', 'react-dom', 'react/jsx-runtime', ...externalDependencies],
            output: {
                entryFileNames: '[name].js',
                assetFileNames: 'assets/[name][extname]',
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'react/jsx-runtime',
                },
            },
        },
        outDir: 'dist',
        target: 'esnext',
    },
});
