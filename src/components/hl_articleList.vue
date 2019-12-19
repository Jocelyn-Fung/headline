<template>
  <div class="articleList" @click="$router.push({path: `/newsDetail/${post.id}`})">
       <div class="lr-model model" v-if="post.cover.length<=2 && post.type===1">
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
       <div class="umd-model model" v-else-if="post.cover.length>2 && post.type===1">
              <div class="up">{{post.title}}
              </div>
              <div class="middle">
                  <img v-for="item in post.cover" :key="item.id" :src="item.url" alt />
              </div>
              <div class="down">
                  <span class="writer">{{post.user.nickname}}</span>
                  <span class="follow">{{post.comment_length}}跟帖</span>
              </div>
      </div>
       <div class="vdo-model model" v-else-if="post.type===2">
              <div class="up">{{post.title}}
              </div>
                <div class="video">
                    <img :src="post.cover[0].url" alt />
                </div>
              <div class="down">
                  <span class="writer">{{post.user.nickname}}</span>
                  <span class="follow">{{post.comment_length}}跟帖</span>
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
        font-size:  14*100vw/360;
        padding-top:10*100vw/360;
        padding-left:10*100vw/360;
        .model{
            display: flex;
            height: 90*100vw/360;
            width:100%;
            border-bottom: 1px solid #ccc;
            .left{
               flex:1;
               .up{
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
        .umd-model{
            flex-direction: column;
           .middle {
            flex: 1;
            display: flex;
            padding: 10px 0 0 0;
            > img {
              width: 33.33%;
              padding: 0 5px;
              box-sizing: border-box;
                }
            }
        }
        /deep/  .vdo-model{
            flex-direction: column;
            height:210*100vw/360;
            .up{
                padding-right: 10*100vw/360;
                line-height: 20*100vw/360;
            }
          /deep/ .video img{
                height: 130*100vw/360;
                width:97%;
                padding: 10*100vw/360 0;

            }
          .down{
              font-size: 10px;
              color:#bbb;
              .writer{
                       margin-right:10*100vw/360;
                   }
          }
        }
    }
</style>
