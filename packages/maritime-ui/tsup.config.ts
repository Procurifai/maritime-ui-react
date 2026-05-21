import { copyFileSync, mkdirSync } from 'node:fs';
import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'button/index': 'src/button/index.ts',
    'card/index': 'src/card/index.ts',
    'badge/index': 'src/badge/index.ts',
    'status-indicator/index': 'src/status-indicator/index.ts',
    'theme/index': 'src/theme/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  splitting: false,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    // Copy CSS theme tokens — tsup doesn't bundle CSS by design.
    mkdirSync('dist/theme', { recursive: true });
    copyFileSync('src/theme/tokens.css', 'dist/theme/tokens.css');
  },
});
