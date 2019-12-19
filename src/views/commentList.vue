<template>
    <!-- 精彩跟帖 -->
    <div class="commentList">
        <div class="keeps">
          <myheader title="精彩跟帖">
            <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
         </myheader>
      <div class="items" v-for="item in list" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>2小时前</span>
          </div>
          <span>回复</span>
        </div>
        <!--v-if:判断是否需要生成评论块，如果有parent说明有上一级则需要生成  -->
        <!-- :item：你需要生成的评论块的数据源 -->
        <myrecursive v-if="item.parent" :secondCom='item.parent' ></myrecursive>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    </div>
</template>

<script>
import myheader from '@/components/hl_header.vue'
// 引入api获取评论内容的数据
import { getCommentList } from '@/api/articleList.js'
// 2.引入准备用于递归的子组件
import myrecursive from '@/components/hl_recursive.vue'
export default {
  props: ['article'],
  data () {
    return {
      list: []
    }
  },
  components: {
    myheader, myrecursive
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await getCommentList(id)
    this.list = res.data.data
    this.list.map(value => {
      value.user.head_img = localStorage.getItem('hl_basetoken') + value.user.head_img
      return value
    })
    console.log(this.list)
  }
}
</script>

<style lang= 'less' scoped>
.commentList{
    /* height: 100vh; */
    background-color: rgb(242,242,242);
}
.keeps {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  > h2 {
    line-height: 50px;
    text-align: center;
  }
  .top{
      display: flex;
  }
  .items {
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
</style>
