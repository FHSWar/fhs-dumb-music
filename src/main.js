import Vue from 'vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
// import VConsole from 'vconsole'
import Loading from './plugin/loading/index'
import MetaInfo from 'vue-meta-info'

// 注意点: 如果想通过use的方式来注册组件, 那么必须先将组件封装成插件
Vue.use(Loading, {
  title: '正在加载...'
})
Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false
// const vConsole = new VConsole()
// Vue.use(vConsole)
Vue.use(MetaInfo)

new Vue({
  router,
  store,
  render: h => h(App),
  // 以下代码是安装了预渲染的插件之后自动添加的
  mounted: () => document.dispatchEvent(new Event('x-app-rendered'))
}).$mount('#app')
