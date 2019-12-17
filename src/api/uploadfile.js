// 这个文件专门用于处理文件上传业务
// 1.引入axios
import axios from '@/utils/myaxios.js'

// 2. 实现用户信息数据更新
export const uploadUserInfo = (data) => {
  return axios({
    method: 'post',
    url: '/upload',
    data
  })
}
