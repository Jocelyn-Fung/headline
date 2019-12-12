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
        <input type="text" placeholder="请输入手机号码">
        <input type="text" placeholder="请输入密码">
      </div>
      <!-- <p class="tips">
        没有账号？
        <a href="#/register" class>去注册</a>
      </p> -->
      <hlbutton class="btn" text="登录" @click="login"></hlbutton>
    </div>
  </div>
</template>

<script>
import hlbutton from '@/components/hl_button.vue'
export default {
  components: {
    hlbutton
  },
  methods: {
    login (data) {
      console.log(data)
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
   margin:5px 0;
 }
//  .tips{
//    display: flex;
//    justify-content: flex-end;
//    padding:5px;
//  }
.btn{
  margin-top:60/360*100vw;
}
}
</style>
