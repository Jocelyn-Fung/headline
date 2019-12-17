<template>
  <div class="register">
     <div class="container">
      <div class="close">
        <span class="iconfont iconicon-test"></span>
      </div>
      <div class="logo">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="inputs">
        <hlinput
          placeholder="手机号码"
          v-model="users.username"
          :rules="/^1\d{10}$/"
          err_msg="请重新输入11位手机号码"
        ></hlinput>
        <hlinput type="nickname" placeholder="昵称" v-model="users.nickname"></hlinput>
         <hlinput type="password" placeholder="密码" v-model="users.password"></hlinput>
      </div>
      <hlbutton class="btn" text="注册" @click="register"></hlbutton>
    </div>
  </div>
</template>

<script>
import hlbutton from '@/components/hl_button.vue'
import hlinput from '@/components/hl_input.vue'
// 引入api注册方法
import { registerInfo } from '@/api/users.js'
export default {
  data () {
    return {
      users: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  components: {
    hlbutton,
    hlinput
  },
  methods: {
    register (event) {
      registerInfo(this.users)
        .then(res => {
        //   console.log(res)
          if (res.data.message === '注册成功') {
            this.$router.push({ name: 'login' })
            this.$toast.success('注册成功，请登录！')
          } else {
            this.$toast.fail(res.data.message)
          }
        })
        .catch(err => {
          console.log(err)
        })
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
