// 头条导航列表
import axios from '@/utils/myaxios.js'

export const getcate = () => {
  return axios({
    method: 'get',
    url: '/category'
  })
}
