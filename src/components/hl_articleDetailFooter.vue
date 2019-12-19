<template>
  <div class="footer">
    <!-- 写跟帖 -->
    <div class="writeComment" @click="writeComment" v-show="!isFocus">写跟帖</div>
      <!-- 写评论 -->
      <div class="comment" v-show="!isFocus" @click="$router.push({path:`/commentList/${article.id}`})">
        <van-icon name="chat-o" info="9" class="forsize" />
      </div>
      <!-- 点收藏 -->
      <div :class="{active:article.has_star}" @click="collection" v-show="!isFocus">
        <van-icon name="star-o" class="forsize" />
      </div>
      <!-- 点击分享 -->
      <div class="share" v-show="!isFocus">
        <van-icon name="cluster-o" class="forsize" />
      </div>
     <commentinput v-show="isFocus" ref="com"> </commentinput>
    </div>

</template>

<script>
// 引入api方法
import { collectTheArticle } from '@/api/articleList.js'
import commentinput from '../components/commentinput.vue'
export default {
  props: ['article'],
  components: {
    commentinput
  },
  data () {
    return {
      isFocus: false
    }
  },
  methods: {
    async collection () {
      let res = await collectTheArticle(this.$route.params.id)
      // console.log(res)
      // if (res.data.message === '收藏成功') {
      //   this.article.has_star = true
      // } else if (res.data.message === '取消成功') {
      //   this.article.has_star = false
      // }
      this.$toast.success(res.data.message)
      this.article.has_star = !this.article.has_star
    },
    // 点击输入框的时候触发
    writeComment () {
      this.isFocus = !this.isFocus

      this.$refs.com.isFocus = true
      // setTimeout(() => {
      //   this.$refs.textArea.focus()
      // }, 1)
      console.log(this.$refs.com)
    }
  }
}
</script>

<style lang='less' scoped>
.footer {
  .followtext {
    display: flex;
    width: 100vw;
    height: 100 * 100vw/360;
    display: none;
    textarea {
      flex: 7;
    }
    .btns {
      flex: 3;
      flex-direction: column;
      padding-left: 20px;
      .cancel {
        flex: 50%;
        width: 60px;
        height: 25px;
        line-height: 25px;
        border: 1px solid #ddd;
        border-radius: 100px;
        text-align: center;
        margin: 5px;
      }
      .send {
        background-color: green;
      }
    }
  }
  background-color: #fff;
  height: 60 * 100vw/360;
  width: 100vw;
  display: flex;
  position: fixed;
  left: 0;
  bottom: 0;
  border: 1px solid #ddd;
  .writeComment {
    background-color: #eee;
    height: 35 * 100vw/360;
    line-height: 35 * 100vw/360;
    flex: 4;
    border: 1px solid #ddd;
    margin: 10 * 100vw/360 20 * 100vw/360;
    border-radius: 300px;
    padding-left: 20px;
  }
  div {
    flex: 1;
    i {
      line-height: 50 * 100vw/360;
      padding-top: 5 * 100vw/360;
      font-size: 30 * 100vw/360 !important;
      position: relative;
      .van-info {
        width: 25 * 100vw/360;
        position: absolute;
        top: 20 * 100vw/360;
        right: 1 * 100vw/360;
      }
    }
  }
  .active {
    color: red;
  }
}
</style>
