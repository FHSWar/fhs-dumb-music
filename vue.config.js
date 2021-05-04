module.exports = {
  /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
  publicPath: './',
  configureWebpack: {
    module: { // 解决的是 public 文件夹 index.html 中底部注释的 2.
      rules: [
        {
          test: /\.(html)$/,
          exclude: /node_modules/,
          use: {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        }
      ]
    }
  }
}
