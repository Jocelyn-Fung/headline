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
