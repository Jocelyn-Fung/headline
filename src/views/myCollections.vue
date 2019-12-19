<template>
  <div class="mycollections">
    <div class="header">
      <myheader title="个人信息编辑">
        <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
    </div>
    <div class="list">
        <van-swipe-cell v-for="item in collectionslist" :key="item.id">
        <articleDetail :post="item">
        </articleDetail>
        <template slot="right">
          <van-button square type="danger" text="删除" @click="del(item.id)"/>
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script>
import myheader from '@/components/hl_header.vue'
import articleDetail from '@/components/hl_articleList.vue'
import { collectArticleList } from '@/api/users.js'
export default {
  data () {
    return {
      collectionslist: []
    }
  },
  components: {
    myheader, articleDetail
  },
  async mounted () {
    let res = await collectArticleList()
    // console.log('111', res)
    if (res.status === 200) {
      this.collectionslist = res.data.data
    //   console.log(this.collectionslist)
    }
  }
}
</script>

<style lang='less' scoped>
.mycollections{
    height:100vh;
    background-color: rgb(242,242,242);
}
</style>
