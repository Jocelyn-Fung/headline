<template>
  <div class="index">
      <div class="header">
          <span class="iconfont iconnew icon"></span>
          <div class="center">
              <van-icon name="search" class="search"/>
              <span>搜索新闻</span>
          </div>
          <span class="right">
              <van-icon name="user-o" class="login"  @click="toPerson"/>
          </span>
      </div>
      <div class="navbar">
             <van-tabs v-model="active" sticky swipeable>
                <van-tab :title="cate.name" v-for="cate in cateList" :key='cate.id'>
                  <!-- 新闻列表  属性offset就是滚动条与底部距离小于 offset 时触发load事件,im-check是否在初始化时立即执行滚动位置检查-->
                  <van-list v-model="cate.loading" :offset="10" :immediate-check='false' :finished="cate.finished" loading-text="正在玩命加载..." finished-text="没有更多了" @load="onLoad">
                    <van-pull-refresh v-model="cate.isLoading" @refresh="onRefresh" loading-text="数据出走，正在玩命加载...">
                      <artList v-for='post in cate.postList' :key='post.id' :post='post'></artList>
                    </van-pull-refresh>
                  </van-list>
                </van-tab>
            </van-tabs>
      </div>
  </div>
</template>

<script>
import { getcate } from '@/api/cate.js'
import { getarticle } from '@/api/articleList.js'
import artList from '@/components/hl_articleList.vue'
export default {
  components: {
    artList
  },
  data () {
    return {
      // 使用token来检测是否已经登录，凡是登录的就会有token，那么就是1，增加了关注，没有的话就是0默认，说明用户没有登录
      active: localStorage.getItem('hl_token') ? 1 : 0, // active 是当前默认或者被点击的栏目
      cateList: [],
      isLoading: false
    }
  },
  //   将获取数据进行封装
  methods: {
    // 加载数据
    onLoad () {
    //  加载下一页的数据
    // 1.页码加1每次
      this.cateList[this.active].pageIndex++
      // 2. 根据新的页码参数获取数据,使用延时器模拟正在加载
      setTimeout(() => {
        this.getPostList()
      }, 2000)
    },
    // 下拉刷新  使用延迟器进行模拟加载
    onRefresh () {
      // 下拉刷新应该是重新加载第一页的数据
      this.cateList[this.active].pageIndex = 1
      // 重置为false的作用就是实现重复的加载数据
      this.cateList[this.active].finished = false
      setTimeout(() => {
        this.$toast('刷新成功')
        // this.isLoading = false
        // 1. 清除数组中的所有数据，可以避免反复创建新的数组
        this.cateList[this.active].postList.length = 0
        // 2.获取刷新后的新数据
        this.getPostList()
      }, 2000)
    },
    //   点击头像跳转到个人中心页面
    toPerson () {
      this.$router.push({ path: `/person/${window.localStorage.getItem('hl_id')}` })
    },
    // 获取新闻数据列表
    async getPostList () {
      let res = await getarticle({
        pageIndex: this.cateList[this.active].pageIndex,
        pageSize: this.cateList[this.active].pageSize,
        category: this.cateList[this.active].id
      })
      // this.cateList[this.active].postList = res.data.data
      // 上拉加载的时候， pageIndex应该跳到当前页的下一页，
      this.cateList[this.active].postList.push(...res.data.data)
      // 如果加载完了，玩命加载的提示应该消失称false
      this.cateList[this.active].loading = false
      // 如果数据加载完了，就换成没有更多了 如果新闻列表的个数已经小于列表一页可以容纳的个数，说明没有更多新闻了
      if (res.data.data.length < this.cateList[this.active].pageSize) {
        this.cateList[this.active].finished = true
      }
      // 下拉刷新的时候，刷新完毕应该停止loading
      this.cateList[this.active].isLoading = false
      // console.log(res) // 此时可以获取到带有具体新闻列表的内容了
    }
  },
  async mounted () {
    let res = await getcate()
    if (res.status === 200) {
      this.cateList = res.data.data
      //   因为这样获取的list里面并没有具体的新闻数据，后台提供的数据不符合，所以需要重新改造数据
      // 添加能够满足业务需求的成员 map可以通过回调函数将数据以数组的形式返回
      this.cateList = this.cateList.map(value => {
        return {
          ...value, // 展开运算符，可以将所有的内容展开，和后面的数据重新组成一个数组
          postList: [], // 具体的数据内容新闻内容文章列表
          pageIndex: 1, // 文章当前页码
          pageSize: 5, // 每一页记录几条数据
          loading: false, // 加载开始
          finished: false, // 加载结束
          isLoading: false // 下拉
        }
      })
      // 改成调用的封装
      this.getPostList()
    }
  },
  //   对数据进行监听，只要active改变了，那么栏目就改变了，数据自然也就改变了
  watch: {
    async active () {
      // 当active改变的时候，如果用户之前已经看过那个栏目的内容，便不需要再去发一次请求了，
      // 反之，如果监听到用户没有看过那个栏目，是首次点击才去发送请求
      if (this.cateList[this.active].postList.length === 0) {
        this.getPostList()
      }
    }
  }
}

// }
</script>

<style lang='less' scoped>
    .index{
        background-color: rgb(242,242,242);
        height: 100%;
        .header{
            display: flex;
            justify-content: space-between;
            height:60*100vw/360;
            background-color: red;
            padding:0 10px;
            color: #fff;
            .center{
                flex:1;
                height:40*100vw/360;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 100px;
                margin:10*100vw/360 10px 0;
                line-height: 40*100vw/360;
                text-align: center;
                .search{
                    font-size: 16*100vw/360;
                    padding-top:3px;
                }
            }
            .iconnew{
                font-size: 60*100vw/360;
                height: 45*100vw/360;
                width:60*100vw/360;

            }
            .login {
                font-size:25*100vw/360;
                padding-top:15*100vw/360;
                color:#fff !important;
            }
        }
    }
</style>
