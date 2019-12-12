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
        <hlinput @input="handleinput" placeholder="请输入手机号码" v-model="users.username"></hlinput>
        <hlinput @input="handleinput" placeholder="请输入密码" v-model="users.password"></hlinput>
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
export default {
  data () {
    return {
      users: {
        username: '111',
        password: '123'
      }
    }
  },
  components: {
    hlbutton, hlinput
  },
  methods: {
    login (data) {
      console.log(data)
    },
    handleinput () {
      console.log(event.target.value)
    }
  }
}
</script>

<style lang='less' scoped>
.container{
  padding:20px;
  height: 635/360*100vw;
  background-color:rgba(242, 242, 242, 1);
  .close{
    span{
      height:26/360*100vw;
    }
  }
  .logo{
  display: flex;
  justify-content: center;
  span {
    display: block;
    font-size: 126 / 360 * 100vw;
    color: #d81e06;
  }
 }
 input{
   height: 40/360*100vw;
   width: 314*100vw/360;
   outline:none;
   border:none;
   border-bottom: 2px solid #bbb;
   background-color: transparent;
   margin:10px 0;
 }
 .tips{
   display: flex;
   justify-content: flex-end;
   padding:5px;
 }
.btn{
  margin-top:60/360*100vw;
}
}
</style>
