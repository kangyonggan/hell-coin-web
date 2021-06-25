import axios from 'axios'

axios.defaults.baseURL = '/api'

// 30s超时
axios.defaults.timeout = 30000

// 请求拦截器
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject({
    message: error + ''
  })
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  if (response.config.baseURL === '/api') {
    if (response.data.success) {
      return response.data.data
    } else {
      return Promise.reject({
        message: response.data.message,
        code: response.data.code
      })
    }
  }
  return response.data
}, function (error) {
  if (error.code === 'ECONNABORTED') {
    return Promise.reject({
      message: '请求超时，请检查网络连接！'
    })
  }
  return Promise.reject({
    message: error.message
  })
})

export default axios
