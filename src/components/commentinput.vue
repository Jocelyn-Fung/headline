<template>
  <div class="commentinput">
        <!-- 输入框 -->
    <div class="followtext" v-show="isFocus">
      <textarea rows="30" ref="textArea"></textarea>
      <div class="btns">
        <div class="send cancel" ref="commtext" v-show="isFocus">发送</div>
        <div class="cancel" ref="commtext" v-show="isFocus">取消</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isFocus: false
    }
  }
}
</script>

<style>

</style>
