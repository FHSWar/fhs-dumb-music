module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小
      // propList: ['width', 'height'] 这里意思是只转换宽度，高度属性的像素值为 rem, 这可不好
      propList: ['*']
    }
  }
}
