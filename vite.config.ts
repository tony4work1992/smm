import react from "@vitejs/plugin-react";
import { resolve } from 'path';
import { defineConfig } from "vite";
import dtsPlugin from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        // {
        //   src: 'package.json', // Source file
        //   dest: ''            // Destination directory within 'dist'
        // },
        {
          src: 'README.md', // Source file
          dest: ''            // Destination directory within 'dist'
        }
      ]
    }),
    dtsPlugin({
      tsconfigPath: resolve(__dirname, "tsconfig.app.json"),
      rollupTypes: true,
    })
  ],

  build: {
    lib: {
      entry: './src/lib/main.ts', // Entry point
      name: 'Smart Model Mapper', // Library name
      fileName: (format) => `smm.${format}.js`,
      formats: ['es']
    },
    rollupOptions: {
      // External dependencies not to bundle
      external: ['react', 'react-dom'],
      plugins: [],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
