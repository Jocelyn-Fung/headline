import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import '@/styles/reset.css'

import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

Vue.config.productionTip = false

// 注入路由
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
