<template>
  <div class="personal">
    <router-link :to="'/editperson/' + currentuser.id">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentuser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentuser.nickname}}
          </div>
          <div class="time">2019-12-14</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
     </router-link>
     <hltable title="我的关注" desc="关注的用户"></hltable>
   <hltable title="我的跟帖" desc="跟帖/回复"></hltable>
   <hltable title="我的收藏" desc="文章/视频"></hltable>
   <hltable title="设置"></hltable>
   <hlbutton text="退出"></hlbutton>

  </div>
</template>

<script>
import { getUserInfo } from '@/api/users.js'
import hltable from '@/components/hl_table'
import hlbutton from '@/components/hl_button.vue'
import axios from 'axios'
export default {
  data () {
    return {
      currentuser: {}
    }
  },
  components: {
    hltable, hlbutton
  },
  mounted () {
    let id = this.$route.params.id
    getUserInfo(id)
      .then(res => {
        // console.log(res.data.data) 请求到数据
        if (res.data.message === '获取成功') {
          this.currentuser = res.data.data
          // console.log('123', this.currentuser) // 赋值给到空数组，后面可以通过点语法获取具体内容
          //  将基准路径保存到本地
          localStorage.setItem('hl_basetoken', axios.defaults.baseURL)
          // 返回的数据可能没有图片数据,我们应该进行判断,如果有图片数据就设置为当前图片,如果没有就使用默认的图片
          if (this.currentuser.head_img) {
            this.currentuser.head_img = localStorage.getItem('hl_basetoken') + this.currentuser.head_img
          } else {
            this.currentuser.head_img = localStorage.getItem('hl_basetoken') + '/uploads/image/default.png'
            // console.log(this.currentuser.head_img)
          }
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>
<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
  /deep/.hl-button{
    margin: 15px auto;
  }
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }

}
</style>
