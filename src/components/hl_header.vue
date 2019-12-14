<template>
  <div class="header">
      <span>
          <slot name="left"></slot>
      </span>
      <span>个人信息编辑</span>
      <span>
          <slot name="right"></slot>
      </span>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='less' scoped>
    .header{
        display: flex;
        height:60*100vw/360;
        width:316*100vw/360;
        justify-content: space-between;
        padding:0 15px;
        align-items:center;
    }

</style>
