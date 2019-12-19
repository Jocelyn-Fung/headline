<template>
  <div class="articaldetail">
    <div class="header">
      <div class="left">
        <van-icon name="arrow-left back" @click="$router.back()" />
        <span class="iconfont iconnew new"></span>
      </div>
      <span @click="followThisUser" :class='{active:article.has_follow}'>{{article.has_follow?'已关注':'关注'}}</span>
    </div>
    <div class="detail">
      <div class="title">{{article.title}}</div>
      <div class="desc">
        <span>{{article.user && article.user.nickname}}</span> &nbsp;&nbsp;
        <span>2019-12-19</span>
      </div>
      <div class="content" v-html='article.content' v-if='article.type===1'></div>
      <video v-if='article.type===2' :src='article.content' controls></video>
      <div class="opt">
         <!-- 这里是点赞-->
        <span class="like" @click="likeThisArticle" :class="{active:article.has_like}">
          <van-icon name="good-job-o" />{{article.like_length}}
        </span>
        <span class="chat">
          <van-icon name="chat" class="w" />微信
        </span>
      </div>
    </div>
    <!-- 精彩跟帖 -->
    <div class="keeps">
      <h2>精彩跟帖</h2>
      <div class="item">
        <div class="head">
          <img src="../assets/logo.png" alt />
          <div>
            <p>{{article.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <div class="text">文章说得很有道理</div>
      </div>
      <div class="more">更多跟帖</div>
    </div>
    <!-- 底部栏 -->
    <articleFooter :article ='article'></articleFooter>
  </div>
</template>

<script>
// 引入点赞api
import { newsDetail, likeTheArticle } from '@/api/articleList.js'
import { followUser, unfollowUser } from '@/api/users.js'
// 引入底部栏子组件
import articleFooter from '@/components/hl_articleDetailFooter.vue'
export default {
  components: {
    articleFooter
  },
  data () {
    return {
      article: {}
    }
  },
  async mounted () {
    let res = await newsDetail(this.$route.params.id)
    // console.log(res)
    if (res.status === 200) {
      this.article = res.data.data
      // console.log(this.article)
    }
  },
  methods: {
    async followThisUser () {
      let res
      if (this.article.has_follow === true) { // 已关注
        res = await unfollowUser(this.article.user.id)
      } else { // 还没关注
        res = await followUser(this.article.user.id)
      }
      if (res.config.headers.Authorization) { // 如果有token那么就是证明已经登录，可以继续操作
        this.$toast.success(res.data.message)
        // this.article.has_follow = true 应该取反，这样子才能连续点击，第一次点击关注，第二次可以点击失败
        this.article.has_follow = !this.article.has_follow
        // console.log(res)
      } else {
        this.$toast.fail('您尚未登录，请先登录')
        this.$router.push({ name: 'login' }) // 没有令牌的话就跳到登录页面先
      }
    },
    // 处理点赞业务
    async likeThisArticle () {
      let res = await likeTheArticle(this.$route.params.id)
      if (res.data.message === '点赞成功') {
        this.article.like_length++
      } else if (res.data.message === '取消成功') {
        this.article.like_length--
      }
      this.article.has_like = !this.article.has_like
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  padding: 0px 10px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > .left {
    height: 100%;
    vertical-align: middle;
    position: relative;
    .van-icon {
      position: absolute;
      top: 15px;
      left: 0;
    }
    > span {
      margin-left: 22px;
      font-size: 50px;
    }
  }
  > span {
    padding: 5px 15px;
    border:1px solid #ccc;
    color: #333;
    text-align: center;
    border-radius: 15px;
    font-size: 13px;
    &.active{
        color: #fff;
        background-color: #f00;
    }
  }
}
.detail {
  padding: 15px;
  .title {
    font-size: 18px;
    font-weight: bold;
    padding: 10px 0;
  }
  .desc {
    line-height: 30px;
    color: #999;
    font-size: 13px;
  }
  .content {
    text-indent: 2em;
    line-height: 24px;
    font-size: 15px;
    padding-bottom: 30px;
    width: 100%;
  }
  video{
      width: 100%;
      margin-bottom: 10px;
  }
}
.opt {
  display: flex;
  justify-content: space-around;
  .like,
  .chat {
    height: 25px;
    padding: 0 15px;
    font-size: 14px;
    line-height: 25px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    &.active{
        color: #fff;
        background-color: #f00;
    }
  }
  .w {
    color: rgb(84, 163, 5);
  }
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
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
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
    margin-bottom: 80px;
  }
}

/deep/.photo{
    img {
        width: 100%!important;
        display: block;
    }
}
</style>
