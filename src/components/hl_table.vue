<template>
  <div class="hl_table" @click="handleclick">
      <div class="left">{{title}}</div>
      <div class="right">{{desc}}
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc'],
  methods: {
    handleclick (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style lang='less' scoped>
    .hl_table{
        display: flex;
        justify-content: space-between;
        height: 50*100vw/360;
        border-bottom: 1px solid #bbb;
        line-height: 50*100vw/360;
        padding:0 15px;
        .right{
            font-size: 13px;
            color:#bbb;
        }
    }
</style>
