import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Permet l'utilisation de globals dans les tests (comme expect)
    environment: 'jsdom', // Utilisation de jsdom pour simuler le DOM
    setupFiles: './src/setupTests.ts', // Fichier de configuration des tests
  },
})
