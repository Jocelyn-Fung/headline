// 文章列表
import axios from '@/utils/myaxios.js'

export const getarticle = (params) => {
  return axios({
    // method: 'get',
    url: '/post',
    params
  })
}
