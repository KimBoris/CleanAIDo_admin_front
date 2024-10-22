import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      '/api': {
        target: 'http://10.10.10.191:8080', // API 서버 주소
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // '/api' 경로를 제거
      }
    }
  }
})