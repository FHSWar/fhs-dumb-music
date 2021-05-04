// 这里我将 axios 包装一层后, 到处去用时仍叫 axios
import axios from 'axios'
import Vue from 'vue'

// 进行一些全局配置 (傻仔 IDE 提示 http 不安全) (这还是松金老哥帮改的)
axios.defaults.baseURL = `http://${location.hostname}:3000/`
axios.defaults.timeout = 5000

let count = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  Vue.hiddenLoading()
  return Promise.reject(error)
})

// 封装自己的get/post方法
export default { // 这里 get 和 post 唯一区别就是 axios 对象调的方法不同
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response.data) // 直接拿 data 与请求道的数据结构有关, 要用的都在返回对象的的 data 属性里了
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  post: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(path, data)
        .then(function (response) {
          resolve(response.data)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  },
  // 第一个应用就是在歌手 tab 拿到 A 到 Z 的列表
  all: function (list) {
    return new Promise(function (resolve, reject) {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch(function (err) {
          reject(err)
        })
    })
  }
}
