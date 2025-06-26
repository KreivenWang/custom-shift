// babel-preset-taro 更多选项和默认值：
// https://docs.taro.zone/docs/next/babel-config
const tailwindVitePlugin = require('./tailwind-vite-plugin')

module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true,
      compiler: 'vite',
      plugins: [
        tailwindVitePlugin() // 添加插件
      ]
    }]
  ]
}
