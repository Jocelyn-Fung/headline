// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入views单文件组件
import Login from '@/views/Login.vue'
import Person from '@/views/Person.vue'

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
      name: 'person',
      path: '/person/:id',
      component: Person
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
