<template>
  <div id="app">
    <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hlinput
          @input="handleinput"
          placeholder="请输入手机号码"
          v-model="users.username"
          :rules="/^1\d{10}$/"
          err_msg="请重新输入11位手机号码"
        ></hlinput>
        <hlinput type="password" placeholder="请输入密码" v-model="users.password"></hlinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p>
      <hlbutton class="btn" text="登录" @click="login"></hlbutton>
    </div>
  </div>
</template>

<script>
// 引入子组件
import hlbutton from '@/components/hl_button.vue'
import hlinput from '@/components/hl_input.vue'
// 引入api登录方法
import { userlogin } from '@/api/users.js'
export default {
  data () {
    return {
      users: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    hlbutton,
    hlinput
  },
  methods: {
    login (event) {
      userlogin(this.users)
        .then(res => {
          if (res.data.message === '登录成功') {
            // console.log(res)
            // 将令牌token存储到本地
            localStorage.setItem('hl_token', res.data.data.token)
            // 存储id,用于后面登录后在首页点击个人中心图标时顺利跳转到个人中心页，而不被拦截去登陆页
            localStorage.setItem('hl_id', res.data.data.user.id)
            // console.log(res.data.data.token)
            // 登录成功跳转页面
            this.$router.push({ path: `/person/${res.data.data.user.id}` })
          } else {
            // 否则返回错误提示信息
            this.$toast.fail(res.data.message)
          }
        })
        .catch((err) => {
          console.log(err)
          this.$toast.fail('网络异常,请重试')
        }
        )
    },
    handleinput (value) {
      // console.log(this.users)
      this.users.username = value
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  padding: 20px;
  height: 635/360 * 100vw;
  background-color: rgba(242, 242, 242, 1);
  .close {
    span {
      height: 26/360 * 100vw;
    }
  }
  .logo {
    display: flex;
    justify-content: center;
    span {
      display: block;
      font-size: 126 / 360 * 100vw;
      color: #d81e06;
    }
  }
  .tips {
    display: flex;
    justify-content: flex-end;
    padding: 5px;
  }
  .btn {
    margin-top: 60/360 * 100vw;
  }
}
</style>
