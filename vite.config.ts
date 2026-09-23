/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const rootDir = path.dirname(fileURLToPath(import.meta.url))

// GitHub Pages lives under /Learning-Dutch-101/; Firebase Hosting is site root (/).
// Override with VITE_BASE_PATH=/ when building for Firebase preview.
const base = process.env.VITE_BASE_PATH || '/Learning-Dutch-101/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(rootDir, './src'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.ts', 'src/**/*.test.tsx'],
  },
})
