import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // ✅ Configuración Vitest
  test: {
    environment: 'jsdom',          // jsdom permite testear componentes React
    globals: true,                 // habilita describe/it/expect sin importar
    setupFiles: './src/setupTests.js', // donde cargamos jest-dom
    css: true,                     // permite importar CSS en tests

    coverage: {
      provider: 'v8',              // motor oficial soportado (no inventado)
      reporter: ['text', 'html'],  // genera informe en consola y HTML
      reportsDirectory: './coverage',
    },
  },
})
