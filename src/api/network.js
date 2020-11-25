import axios from 'axios'

// 进行一些全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 3000

// 封装自己的get/post方法
export default { // 这里 get 和 post 唯一区别就是 axios 对象调的方法不同
  get: function (path = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(path, {
        params: data
      })
        .then(function (response) {
          resolve(response)
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
          resolve(response)
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }
}
