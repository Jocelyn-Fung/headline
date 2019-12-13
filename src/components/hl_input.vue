<template>
      <input type="text" class="inp"
      @input="handleinput"
      :value="value"
      :class="{error:!statu, success: statu}"
      @blur="handleblur"
      >
</template>

<script>
// 这个文件用于封装输入框
// rules用于规定用户输入的内容，不正确的话给与提示
export default {
  // 设置一个 属性，用于后面做判断
  data () {
    return {
      statu: false
    }
  },
  props: ['value', 'rules', 'err_msg'],
  methods: {
    // 1.响应输入业务
    handleinput (event) {
      // 要告诉父组件内容变化，并且要告诉父组件内容到底现在是什么值
      let value = event.target.value
      // 判断如果用户输入的内容不符合要求下边框就变成红色，否则就是绿色、
      // console.log('123', this.rules.test(value))// 得到true与false的布尔型结果
      // 再套一层判断，如果有rules的才进行11位数字的限制，密码不需要
      if (this.rules) {
        if (this.rules.test(value)) {
        // console.log(11)
          this.statu = true
        } else {
          this.statu = false
        }
      } else {
        this.statu = !!value
      }

      this.$emit('input', value)
    //   console.log(value)
    },
    // 2.响应文本失去焦点
    handleblur (event) {
      if (this.rules && !this.rules.test(event.target.value)) {
        this.$toast.fail(this.err_msg)
      }
    }
  }
}
</script>

<style lang="less" scoped>
input{
    width: 314*100vw/360;
    height: 40*100vw/360;
    border:none;
    outline: none;
    border-bottom: 2px solid rgb(117,117,117);
    font-size: 18px;
    margin: 5px 0;
    background-color: transparent;
 }
 .error{
  border-bottom-color:red;
}
.success{
  border-bottom-color:green;
}
</style>
