import Vue from 'vue'
import router from './router'
import store from './store'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
// import VConsole from 'vconsole'

Vue.use(VueLazyload, {
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/images/loading.png')
})

Vue.config.productionTip = false
// const vConsole = new VConsole()
// Vue.use(vConsole)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
