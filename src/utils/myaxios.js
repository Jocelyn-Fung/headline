import axios from 'axios'
//  配置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器 ，在拦截器进行token值得传递  参考axios文档
// // config就是当前的请求报文
axios.interceptors.request.use(function (config) {
  // 判断响应的结果，是否是用户验证失败，如果是就重定向，回登录页面
  let token = localStorage.getItem('hl_token')
  localStorage.setItem('hl_basetoken', axios.defaults.baseURL)
  //   console.log(token)
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
//   console.log('ss', response)
  //   判断当前响应得结果，是否是用户信息验证失败，如果是就重定向去登录
  if (response.data.message === '用户验证信息失败' || response.data.message === '用户验证信息失败！') {
    this.$toast.fail('用户信息验证失败')
    // 重定向
    location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default axios
