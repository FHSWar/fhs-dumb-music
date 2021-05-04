const jsdom = require('jsdom') // 用于在 node 环境中获取 dom 节点， 从而解决预渲染中加载动画不消失的问题
const { JSDOM } = jsdom

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
  },
  // 以下代码是安装了预渲染的插件之后自动添加的
  pluginOptions: {
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/',
        '/recommend',
        '/singer',
        '/rank',
        '/search',
        '/account',
        '/detail'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true,
      // 预渲染内容写入之前的额外操作
      postProcess: route => {
        // 用于去掉预渲染中各个页面的关于视口的 meta 标签 (预渲染是模拟渲染, 并不能拿到设备像素比, 所以这个缩放可能不对)
        // 我们这里在 index.html 中通过 js 代码动态设置
        const reg = /<meta name="viewport".*user-scalable=no">/gi
        const res = route.html.match(reg)
        route.html = route.html.replace(res[1], '')

        // 1.根据字符串创建一个网页
        const html = new JSDOM(route.html)
        // 2.从创建好的网页中拿到document对象
        const dom = html.window.document
        // 3.找到对应的元素, 删除对应的元素
        const loadingEle = dom.querySelector('.container')
        dom.body.removeChild(loadingEle)
        route.html = html.serialize()
        return route
      }
    }
  }
}
