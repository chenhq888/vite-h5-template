const autoprefixer = require('autoprefixer')
const postcssPxtorem = require('postcss-pxtorem')

module.exports = {
  plugins: [
    // 自动补全css浏览器前缀
    autoprefixer({
      overrideBrowserslist: [
        'last 10 Chrome versions',
        'last 5 Firefox versions',
        'Safari >= 6',
        'ie > 8'
      ]
    }),
    postcssPxtorem({
      rootValue({ file }) {
        // vant 设计稿尺寸是 375
        return file.indexOf('node_modules/vant') !== -1 ? 37.5 : 75
      },
      unitPrecision: 5,
      propList: ['*'],
      selectorBlackList: ['.ignore', 'keep-px'], //要忽略并保留为px的选择器
      minPixelValue: 1,
      mediaQuery: false
    })
  ]
}
