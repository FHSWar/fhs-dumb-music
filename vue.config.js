module.exports = {
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
