// 文章列表
import axios from '@/utils/myaxios.js'

export const getarticle = (params) => {
  return axios({
    // method: 'get',
    url: '/post',
    params
  })
}
// 文章详情
export const newsDetail = (id) => {
  return axios({
    method: 'get',
    url: `/post/${id}`,
    id
  })
}
// 点赞与取消点赞
export const likeTheArticle = id => {
  return axios({
    method: 'get',
    url: `/post_like/${id}`
  })
}
// 收藏与取消收藏
export const collectTheArticle = id => {
  return axios({
    method: 'get',
    url: `/post_star/${id}`
  })
}
