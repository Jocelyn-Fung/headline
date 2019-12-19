<template>
  <div class="editperson">
      <editheader class="edit" title="个人中心" >
          <span class="iconfont iconjiantou2" slot="left" @click="$router.back()"></span>
      </editheader>
      <div class="head">
        <img alt="" :src='
        current.head_img'>
        <van-uploader :after-read="afterRead" />
      </div>
      <edittable title='昵称' :desc='current.nickname' @click="nickshow = !nickshow"></edittable>
      <edittable title='密码' desc='******' @click="pawshow =! pawshow"></edittable>
      <edittable title='性别' :desc="current.gender ===1?'男':'女'" @click="gendershow = !gendershow">
      </edittable>

      <!-- 以组件的方式来使用dialog  用法与bootstrap中的模态框一样，都是单独的，不需要写在页面的标签中，添加事件绑定即可-->
      <!-- // 添加dialog 昵称 -->
      <van-dialog v-model="nickshow" title="修改昵称" show-cancel-button @confirm='updateNickname'>
      <van-field required :value='current.nickname' label="昵称" placeholder="请输入昵称" ref="inp"/>
      </van-dialog>
      <!-- 密码 -->
        <!-- 使用before-close需要写在行内 -->
      <van-dialog v-model="pawshow" title="修改密码" show-cancel-button @confirm='updatepsw' :before-close='beforeClose'>
        <van-field  required  label="原密码" right-icon="question-o" placeholder="请输入原始密码"
         @click-right-icon="$toast('question')" ref="oldpsw" />
        <van-field  label="新密码" placeholder="请输入新密码" required ref="newpsw"/>
      </van-dialog>

      <!-- 性别 -->
      <van-dialog v-model="gendershow" title="修改性别" show-cancel-button @confirm='updategender' >
        <!-- 此处的colums属性是一个数组，因为数组只有两项内容，所以直接在行内写，索引0代表女，索引1代表男，后面可根据索引修改性别 -->
        <van-picker :columns="['女','男']"  :default-index='current.gender' @change="onChange"/>
      </van-dialog>
      </div>
</template>

<script>
// 1，引入封装好的头部
import editheader from '@/components/hl_header.vue'
// 引入封装好的table
import edittable from '@/components/hl_table.vue'
// api方法
import { getUserInfo, editUserInfo } from '@/api/users.js'
// 用户信息更新
import { uploadUserInfo } from '@/api/uploadfile.js'

export default {
  data () {
    return {
      id: '',
      current: {},
      nickshow: false,
      gendershow: false,
      pawshow: false
    }
  },
  components: {
    editheader, edittable
  },
  methods: {
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      // 1.通过file.file可以获取到文件的资源数据
      // 2.包装成为formdata
      let formdata = new FormData()
      formdata.append('file', file.file)
      // console.log(file)
      // 3.发起异步请求实现文件上传
      let res = await uploadUserInfo(formdata)
      if (res.data.message === '文件上传成功') {
        //     // 实现用户头像数据的更新
        // let id = this.$route.params.id
        // console.log('123', id)
        let res1 = await editUserInfo(this.current.id, { head_img: res.data.data.url })
        // console.log('res', res1)
        if (res1.data.message === '修改成功') {
          // 修改成功就刷新页面,实现用户头像数据的更新
          this.current.head_img = localStorage.getItem('hl_basetoken') + res1.data.data.head_img
          this.$toast.success('头像修改成功!')
        } else {
          this.$toast.fail('头像修改失败,请重试!')
        }
      } else {
        this.$toast.fail('文件上传失败,请重试!')
      }
    },
    // 修改用户昵称
    async updateNickname () {
      let nickname = this.$refs.inp.$refs.input.value
      // console.log('11', nickname)
      let res = await editUserInfo(this.current.id, { nickname })
      if (res.data.message === '修改成功') {
        // 发送数据，更新数据
        this.current.nickname = nickname
        // console.log(this.current.nickname)
        this.$toast.success('昵称修改成功！')
      } else {
        this.$toast.fail('昵称修改失败，请重试')
      }
    },
    // 修改用户性别
    updategender () {
      // 由于gender是在行内写的，键值形式，所以传值的时候也是键值的形式
      editUserInfo(this.current.id, { gender: this.genderIndex })
        .then(res => {
          // console.log(res) // 修改成功，就更新数据，页面更新
          if (res.data.message === '修改成功') {
            // 应该先获取用户修改的gender值，把它付给当前，且更新数据库， 在onchange那里就可以捕捉到索引0是女，1是男
            this.current.gender = this.genderIndex
            this.$toast.success('修改成功')
            // console.log(res.data.data.gender)
          } else {
            this.$toast.fail('修改失败')
          }
        }).catch(err => {
          console.log(err)
        })
    },
    onChange (picker, value, index) {
      this.genderIndex = index
      // console.log('321', this.genderIndex)
      // this.$toast(`当前值：${value}, 当前索引：${index}`)
    },
    // 修改用户密码 点击确认按钮的时候
    // 应先判断原始密码是否正确，如果不正确给出错误提示，且输入框不关闭，原始密码正确的时候，获取用户输入的新密码，给出成功修改的提示
    updatepsw () {
      let oldpsw = this.$refs.oldpsw.$refs.input.value // 获取到用户输入的原始密码，进行判断，如果符合就继续，不符合就提示旧密码不对
      // console.log(oldpsw)
      // 原密码 this.current.password
      if (this.current.password === oldpsw) {
        // 用户输入的原始密码与数据库内的原始密码一致，应该将新的密码覆盖旧的密码，修改数据库,且返回登录页面，重新登录
        let password = this.$refs.newpsw.$refs.input.value
        // 对新密码进行要求，
        if (!/\w{3,16}/.test(password)) {
          this.$toast.fail('请输入3~16位的新密码')
          return
        }
        editUserInfo(this.current.id, { password })
          .then(res => {
            if (res.data.message === '修改成功') {
              this.$toast.success('密码修改成功，请重新登录')
              localStorage.removeItem('hl_token')
              localStorage.removeItem('hl_basetoken')
              this.$router.push({ name: 'login' })
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.$toast.fail('原始密码错误，请重新输入正确的密码')
      }
    },
    beforeClose (action, done) {
      let oldpsw = this.$refs.oldpsw.$refs.input.value
      let password = this.$refs.newpsw.$refs.input.value
      if (action === 'confirm' && this.current.password !== oldpsw) {
        this.$toast.fail('原始密码错误，请重新输入正确的密码')
        done(false)
      } else if (action === 'confirm' && !/\w{3,16}/.test(password)) {
        this.$toast.fail('请输入3~16位字符')
        done(false)
      } else {
        done()
      }
    }
  },
  async mounted () {
    let id = this.$route.params.id
    // console.log(id)
    let res = await getUserInfo(id)
    // console.log(res)
    if (res.data.message === '获取成功') {
      this.current = res.data.data
      // console.log(this.current)
      if (this.current.head_img) {
        this.current.head_img = localStorage.getItem('hl_basetoken') + this.current.head_img
      } else {
        this.current.head_img = localStorage.getItem('hl_basetoken') + '/uploads/image/default.png'
      }
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
