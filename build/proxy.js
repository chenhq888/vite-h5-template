export default {
  '/api': {
    target: 'http://127.0.0.1:8000', // 后台服务地址
    changeOrigin: true, // 是否允许不同源
    secure: false, // 支持https
    rewrite: path => path.replace(/^\/api/, '')
  }
}
