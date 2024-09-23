import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Define aliases para facilitar as importações
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    // Configurações do servidor de desenvolvimento
    port: 3000, // Porta onde o servidor será iniciado
    open: true, // Abre automaticamente o navegador
  },
  build: {
    // Configurações de build
    outDir: 'dist', // Diretório de saída
    sourcemap: true, // Gera sourcemaps para facilitar o debug
  },
  css: {
    // Configurações para pré-processadores CSS
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`, // Importa variáveis SCSS em todos os arquivos
      },
    },
  },
});
