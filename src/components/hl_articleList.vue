<template>
  <div class="articleList">
      <div class="model">
          <div class="left">
              <div class="up">{{post.title}}
              </div>
              <div class="down">
                  <span class="writer">{{post.user.nickname}}</span>
                  <span class="follow">{{post.comment_length}}跟帖</span>
              </div>
          </div>
          <div class="right">
               <img :src="post.cover[0].url" alt />
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang='less' scoped>
    .articleList{
        .model{
            display: flex;
            height: 90*100vw/360;
            width:100%;
            border-bottom: 1px solid #ccc;
            // padding: 0 10*100vw/360;
            .left{
               flex:1;
               padding-left:10*100vw/360;
               .up{
                   font-size: 14*100vw/360;
                   padding-top:15*100vw/360;
                   line-height: 20*100vw/360;;
               }
               .down{
                   font-size: 10px;
                   color:#bbb;
                   margin-top: 10*100vw/360;
                   .writer{
                       margin-right:10*100vw/360;
                   }
               }
            }
            .right{
               img{
                   height:70*100vw/360;
                   width: 120*100vw/360;
                   padding:10*100vw/360;
               }
            }
        }
    }
</style>
