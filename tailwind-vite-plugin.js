// scripts/tailwind-vite-plugin.js
const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')

module.exports = function tailwindVitePlugin() {
  return {
    name: 'tailwind-vite-plugin',
    enforce: 'pre',
    async buildStart() {
      console.log('开始处理 Tailwind CSS...')
      
      // 确保输出目录存在
      const outputDir = path.join(process.cwd(), 'src', 'styles')
      fs.mkdirSync(outputDir, { recursive: true })
      
      // 读取原始 CSS 文件
      const inputCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
      `
      
      // 处理 CSS
      try {
        const result = await postcss([
          tailwindcss(path.join(process.cwd(), 'tailwind.config.js')),
          autoprefixer,
          // 生产环境压缩 CSS
          ...process.env.NODE_ENV === 'production' 
            ? [cssnano({ preset: 'default' })] 
            : []
        ]).process(inputCss, { from: undefined })
        
        // 写入处理后的 CSS
        const outputPath = path.join(outputDir, 'tailwind.wxss')
        fs.writeFileSync(outputPath, result.css)
        
        console.log('Tailwind CSS 已成功处理并写入:', outputPath)
      } catch (error) {
        console.error('处理 Tailwind CSS 时出错:', error)
        throw error
      }
    },
  }
}