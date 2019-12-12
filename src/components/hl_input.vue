<template>
  <div class="hl_input">
      <input type="text" class="inp"
      @input="handleinput"
      :value="value">
  </div>
</template>

<script>
// 这个文件用于封装输入框
export default {
  props: ['value'],
  methods: {
    handleinput (event) {
      // 要告诉父组件内容变化，并且要告诉父组件内容到底现在是什么值
      let value = event.target.value
      this.$emit('input', value)
    //   console.log(value)
    }
  }
}
</script>

<style lang="less" scoped>
.hl_input{
    input{
   height: 40/360*100vw;
   width: 314*100vw/360;
   outline:none;
   border:none;
   border-bottom: 2px solid #bbb;
   background-color: transparent;
   margin:5px 0;
 }
}
</style>
