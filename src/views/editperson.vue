<template>
  <div class="editperson">
      <editheader class="edit">
          <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      </editheader>
      <div class="head">
        <img alt="" src="http://localhost:3000/uploads/image/default.png">
        <van-uploader :after-read="afterRead" />
      </div>
        <edittable title='昵称' desc="122"></edittable>
         <edittable title='密码' desc="123"></edittable>
          <edittable title='性别' desc="女"></edittable>
      </div>
</template>

<script>
// 1，引入封装好的头部
import editheader from '@/components/hl_header.vue'
// 引入封装好的table
import edittable from '@/components/hl_table.vue'
import { getUserInfo } from '@/api/users.js'
export default {
  data () {
    return {
      id: '',
      current: {}
    }
  },
  components: {
    editheader, edittable
  },
  methods: {
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    }
  },
  async mounted () {
    let id = this.$route.params.id
    let res = await getUserInfo(id)
    console.log(res)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      console.log(this.current)
    }
  }
}
</script>

<style lang='less' scoped>
.editperson{
  background-color: rgb(242,242,242);
  height:100vh;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  .uploader {
    position: absolute;
    opacity: 0;
  }

  img {
    display: block;
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
    border-radius: 50%;
  }
}
  /deep/ .van-uploader__upload{
    width: 100 / 360 * 100vw;
    height: 100 / 360 * 100vw;
  }
  /deep/ .van-uploader{
      position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    opacity: 0;
  }
</style>
