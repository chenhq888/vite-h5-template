import { defineConfig, loadEnv } from 'vite'

import { createVitePlugins } from "./build/plugins"
import proxy from './build/proxy'

import { resolve } from 'path'

const pathResolve = pathStr => resolve(__dirname, pathStr)

export default defineConfig(({ mode }) => {
  // 获取环境变量
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    resolve: {
      alias: {
        '@': pathResolve('src'),
        '@styles': pathResolve('src/styles'),
        '@components': pathResolve('src/components')
      },
      extensions: ['.js', '.vue']
    },
    server: {
      https: false,
      host: true,
      port: 8899,
      open: false,
      /** 跨域设置允许 */
      cors: true,
      /** 端口被占用时，是否直接退出 */
      strictPort: false,
      /** 接口代理 */
      proxy: proxy
    },
    build: {
      outDir: 'dist',
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: false,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          comments: false
        }
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `@import "${pathResolve('src/styles/index.less')}";`
        }
      }
    },
    plugins: createVitePlugins(env)
    // plugins: [vue(), createHtmlPlugin()]
  }
})
