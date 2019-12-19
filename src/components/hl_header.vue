<template>
  <div class="header">
      <span>
          <slot name="left"></slot>
      </span>
      <span>{{title}}</span>
      <span>
          <slot name="right"></slot>
      </span>
  </div>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style lang='less' scoped>
    .header{
        display: flex;
        // position:fixed;
        height:60*100vw/360;
        width:316*100vw/360;
        justify-content: space-between;
        padding:0 15px;
        align-items:center;
    }

</style>
