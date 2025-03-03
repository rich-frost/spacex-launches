import { configDefaults, defineConfig, coverageConfigDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

const exclude = ['e2e/*', 'next.config.ts', 'setupTests.ts'];
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./setupTests.js'],
    globals: true,
    exclude: [...configDefaults.exclude, ...exclude],
    coverage: {
      exclude: [...coverageConfigDefaults.exclude, ...exclude],
    },
  },
});
