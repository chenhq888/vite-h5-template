import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from "vite-plugin-compression"
import Components from "unplugin-vue-components/vite"
import { VantResolver } from "unplugin-vue-components/resolvers"

export const createVitePlugins = (env) => {
  return [
    vue(),
    // 创建打包压缩配置
    createCompression(env),
    // 注入变量到 html 文件
    createHtmlPlugin({
      inject: {
        data: { title: env.VITE_APP_TITLE }
      }
    }),
    // vant 组件自动按需引入
    Components({
      resolvers: [VantResolver()]
    })
  ]
}
const createCompression = (env) => {
  const plugins = []
  if (env.VITE_BUILD_PRESS) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
      })
    )
    return plugins
  }
}