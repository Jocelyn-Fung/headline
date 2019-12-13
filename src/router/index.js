// 1. 引入
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入单文件组件
import Login from '@/views/Login.vue'
import Person from '@/views/Person.vue'
// 挂载
Vue.use(VueRouter)

// 2. 创建路由对象
var router = new VueRouter({
// 3.配置路由
  routes: [
    // 暂时使用，后期需要改成首页
    {
      name: 'default',
      path: '/',
      component: Login
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'person',
      path: '/person',
      component: Person
    }
  ]
})

// 4.暴露
export default router
