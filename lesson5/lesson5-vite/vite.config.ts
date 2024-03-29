import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    include: ['**/*.test.(tsx|ts)'],
    globals: true
  },
})