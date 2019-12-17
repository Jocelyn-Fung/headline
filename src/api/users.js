// 这个文件专门用来处理用户的业务
// 引入axios
import axios from '@/utils/myaxios.js'

// 2. 实现登录验证
export const userlogin = (data) => {
  //  axios({}) 返回的是一个promise对象，后面可以使用。then catch
  return axios({
    method: 'post',
    url: '/login',
    data
  })
}
// 3. 个人中心页面
export const getUserInfo = (id) => {
  return axios({
    // headers: {
    //   Authorization: localStorage.getItem('hl_token')
    // }, // 拦截器处添加了token只要有token就通过，没有就不能正常显示页面，需登录
    url: `/user/${id}`
  })
}
// 4.编辑用户信息
export const editUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data
  })
}
// 5.用户注册信息
export const registerInfo = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data
  })
}
