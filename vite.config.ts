import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // 只有打包生产环境才拼接仓库子路径；本地开发mode=development，base为'/'
    base: mode === 'production' ? '/junruguo-portfolio/' : '/',
  }
})

