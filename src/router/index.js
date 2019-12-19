// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入views单文件组件
import Login from '@/views/Login.vue'
import Person from '@/views/Person.vue'
import Editperson from '@/views/editperson.vue'
import Register from '@/views/register.vue'
import Index from '@/views/index.vue'
import Newsdetail from '@/views/newsdetail.vue'
import Myfollows from '@/views/myfollows.vue'
import MyCollections from '../views/myCollections.vue'
// 挂载
Vue.use(VueRouter)

// 2. 创建路由对象
var router = new VueRouter({
// 3.配置路由
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'register',
      path: '/register',
      component: Register
    },
    {
      name: 'person',
      path: '/person/:id',
      component: Person
    },
    {
      name: 'editperson',
      path: '/editperson/:id',
      component: Editperson
    },
    {
      name: 'index',
      path: '/index',
      component: Index
    },
    // 跳转到新闻详情页
    {
      name: 'newsdetail',
      path: '/newsdetail/:id',
      component: Newsdetail
    },
    // 跳转到我的关注页面
    {
      name: 'myfollows',
      path: '/myfollows',
      component: Myfollows
    },
    // 跳转到我的收藏页面
    {
      name: 'myCollections',
      path: '/myCollections',
      component: MyCollections
    }
  ]
})
// 添加导航守卫
// to：目标路由对象
router.beforeEach((to, from, next) => {
  // console.log(next)
  if (to.path.indexOf('/person/') === 0) {
    let token = localStorage.getItem('hl_token')
    if (token) { // 如果有token数据，说明登录过了
      next()
      // console.log('验证成功')
    } else { // 否则就重定向跳回登陆页面
      next({ name: 'login' })
      // console.log('验证失败')
    }
  } else { // 如果访问不需要授权的页面，就自由访问
    next()
    // console.log('下一页')
  }
})

// 4.暴露
export default router
