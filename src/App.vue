<template>
  <div id="app" class="wrapper" ref="wrapper">
    <MainHeader/>
    <TabBar/>
    <keep-alive include="Singer, Search">
      <router-view/> <!-- 不给路由出口哪有得显示啊弟弟 -->
    </keep-alive>
    <Player/>
  </div>
</template>
<script>
// import Header from './components/Home/Home-Header'
import MainHeader from './components/MainHeader'
import TabBar from './components/Home/Home-TabBar'
import Player from './views/Player'

export default {
  name: 'App',
  components: {
    // Header,
    MainHeader,
    TabBar,
    Player
  }
}
/*
1.单页Web应用（single page web application，SPA）
SPA只会加载一个HTML页面, 它将所有的活动局限在这个HTML页面中
SPA不会因为用户的操作而进行页面的重新加载或跳转
SPA在用户与应用程序交互时通过动态更新页面内容的方式来呈现不同的内容
Vue开发的项目就是典型的SPA项目, 所有的内容其实都在一个页面中
我们只是通过路由控制不同内容的显示隐藏来让它看上去是界面的跳转而已

2. SPA优点
1) 有良好的交互体验
能提升页面切换体验，用户在访问应用页面是不会频繁的去切换浏览页面，从而避免了页面的重新加载
2) 前后端分离开发
单页Web应用可以和 RESTful 规约一起使用，通过 REST API 提供接口数据
并使用 Ajax 异步获取，这样有助于分离客户端和服务器端工作
更进一步，可以在客户端也可以分解为静态页面和页面交互两个部分
3) 减轻服务器压力
服务器只用出数据就可以，不用管展示逻辑和页面合成，吞吐能力会提高几倍
4) 共用一套后端程序代码
不用修改后端程序代码就可以同时用于 Web 界面、手机、平板等多种客户端

3. 缺点：
1) SEO难度较高
由于所有的内容都在一个页面中动态替换显示，所以在SEO上其有着天然的弱势，
所以如果你的站点对SEO很看重，且要用单页应用，那么就做些静态页面给搜索引擎用吧；
2) 前进、后退管理
由于单页Web应用在一个页面中显示所有的内容，
所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理
3) 初次加载耗时多
为实现单页Web应用功能及显示效果，需要在加载页面的时候将JavaScript、CSS统一加载，
部分页面可以在需要的时候加载。 (懒加载)
* */
/*
1.如何解决单页面应用的SEO困难问题?
解决这个问题之前首先我们需要了解常见的三种网页渲染方式

1.1客户端渲染(CSR  - Client Side Render)
后端只提供数据，前端做视图和交互逻辑(SPA应用就是典型的客户端渲染)
1.2客户端渲染过程
1. 客户端请求html (请求)
2. 服务端返回html
3. 客户端渲染HTML,找到依赖的JS/CSS文件
3. 客户端请求对应的JS/CSS文件 (请求)
4. 服务端返回对应的JS/CSS文件
5. 客户端等待JS/CSS文件下载完成
6. 客户端加载并初始化下载好的JS文件
7. 客户端执行JS代码向后端请求数据 (请求)
8. 服务端返回数据
9. 客户端利用服务端返回的数据填充网页
最大优点: 交互体验好可以做局部更新
最大缺点: 首屏加载慢(因为要等到HTML下载完才会去下载JS/CSS, 要等到JS下载完初始化完才会去获取数据),
---
1.1服务端渲染(SSR - Server Side Render)
后端既提供数据又提供视图和交互逻辑
也就是服务器接到客户端请求之后，找到对应的数据并根据找到的数据生成对应的视图
然后将包含数据的视图一次性发给客户端，客户端直接将渲染即可
1.2服务端渲染过程
1.客户端请求html (请求)
2.服务端内部查找对应的html文件和数据
3.服务器内部根据数据html文件和数据生成完整网页
4.服务端返回完整网页
5.客户端渲染HTML,找到依赖的JS/CSS文件
5.客户端请求对应的JS/CSS文件 (请求)
6.客户端等待JS/CSS文件下载完成
7.客户直接展示网页
最大优点: 首屏加载快(因为服务器返回的网页已经包含数据, 所以之下载完JS/CSS就可以直接渲染)
          每次请求返回的都是一个独立完成的网页, 更利于SEO
最大缺点:网络传输数据量大
---
1.1预渲染
无需服务器实时动态编译，采用预渲染，在构建时针对特定路由简单的生成静态HTML文件
本质就是客户端渲染, 只不过和SPA不同的是预渲染有多个界面
最大优点: 由于有多个界面, 所以更利于SEO
最大缺点: 首屏加载慢, 预编译会非常的慢

1.4如何选择
1.注重SEO的新闻、电商网站，建议采用服务器端渲染
2.强交互的页面，不注重SEO，采用客户端渲染
3.两者之间, 只需改善少数页面的SEO，采用预渲染 (vue add prerender-spa)
* */
/*
1.使用预渲染解决SPA应用SEO问题
https://www.npmjs.com/package/vue-cli-plugin-prerender-spa
注意点: Router必须使用history模式
2.使用vue-meta-info统一管理SEO三大标签
https://www.npmjs.com/package/vue-meta-info
* */
/*
1.使用预渲染解决SPA应用SEO问题
https://www.npmjs.com/package/vue-cli-plugin-prerender-spa
注意点: Router必须使用history模式
*/
/*
2.使用vue-meta-info统一管理SEO三大标签
https://www.npmjs.com/package/vue-meta-info
* */
</script>
