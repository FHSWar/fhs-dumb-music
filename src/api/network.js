import axios from 'axios'

// 进行一些全局配置
axios.defaults.baseURL = `http://${location.hostname}:3000/`
axios.defaults.timeout = 3000

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
  }
}
