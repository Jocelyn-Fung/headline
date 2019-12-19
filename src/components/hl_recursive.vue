<template>
  <div class="recursive">
       <div class="items" >
         <myfloors v-if='secondCom.parent' :secondCom='secondCom.parent'></myfloors>
        <div class="head">
          <img :src="secondCom.user.head_img" alt />
          <div>
            <p>{{secondCom.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">{{secondCom.content}}</div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['secondCom'],
  name: 'myfloors'
}
</script>

<style lang='less' scoped>
.items {
    padding: 10px;
    border: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }

</style>
