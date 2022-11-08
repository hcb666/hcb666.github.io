<template>
  <div class="say-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="wrap-top">
        <div class="card">
          <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
          <img src="@/assets/images/favourite_gray.png" alt />
        </div>
        <div class="bg" :style="{backgroundImage:music?`url('${music?.json_content?.music_header?.bg}')` : ''}">
          <div class="img">
            <img :src="music ?`${music?.json_content?.music_header?.cover}?imageView2/1/w/120/h/120/q/75` : ''" alt />
            <p>{{music?.json_content?.music_header?.info}}</p>
          </div>
        </div>
        <div class="t-section">
          <h1>{{music?.title}}</h1>
          <div class="t-box">
            <span>{{music?.json_content?.simple_author[0]}}</span>
            <span>
              <img src="@/assets/images/detail_content.png" alt />
            </span>
          </div>
          <h3 v-html="music?.json_content?.content"
            style="font-size:15rem;color:#333;font-weight:400;line-height:30rem; margin-bottom: 60rem;"></h3>
          <FoundMusicViewComponent id="component" :author="author" :rela="rela" :praiseand="praiseand" />
        </div>
      </div>
      <div class="wrap-fot">
        <form action>
          <input type="text" placeholder="写一个评论" />
        </form>
        <div class="icon">
          <span>
            <img src="@/assets/images/feeds_laud_default.png" alt />
            <p>{{music?.praisenum}}</p>
          </span>
          <span>
            <a href="#component">

              <img src="@/assets/images/bottom_comment.png" alt />
            </a>
            <p>{{music?.commentnum}}</p>
          </span>
          <span @click="show=true">
            <img src="@/assets/images/share_image.png" alt />
          </span>
        </div>
      </div>
      <div class="mask animate__animated animate__fadeInUp" v-if="show">
        <div class="clear" @click="show=false">
          <img src="@/assets/images/close_pressed.png" alt />
        </div>
        <div class="icon">
          <span>
            <img src="@/assets/images/bubble_moment.png" alt />
          </span>
          <span>
            <img src="@/assets/images/bubble_wechat.png" alt />
          </span>
          <span>
            <img src="@/assets/images/bubble_qq.png" alt />
          </span>
          <span>
            <img src="@/assets/images/bubble_weibo.png" alt />
          </span>
          <span>
            <img src="@/assets/images/bubble_copy_link.png" alt />
          </span>
        </div>
      </div>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
  <!-- 
  })-->
</template>
  
<script>
// https://apis.netstart.cn/one/essay/htmlcontent/5243  文章
// https://apis.netstart.cn/one/author/list?content_id=5558&category=1  作者
// https://apis.netstart.cn/one/relatedforwebview/essay/5558  推荐
// https://apis.netstart.cn/one/comment/praiseandtime/essay/5558/0  评论
import FoundMusicViewComponent from "@/components/foundc/FoundMusicViewComponent.vue";
export default {
  components: {
    FoundMusicViewComponent
  },
  data() {
    return {
      music: null,
      author: [],
      rela: [],
      praiseand: null,
      loading: false,

      show: false
    };
  },
  methods: {
    getPlayList: function (id) {
      this.loading = true

      Promise.all([
        this.axios.get(`https://apis.netstart.cn/one/music/htmlcontent/${id}`),
        this.axios.get(
          `https://apis.netstart.cn/one/author/list?content_id=${id}&category=4`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/relatedforwebview/music/${id}`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/comment/praiseandtime/music/${id}/0`
        )
      ]).then(([res, author, rela, praiseand]) => {
        this.loading = false

        this.music = res.data.data;
        this.author = author.data.data;
        this.rela = rela.data.data;
        this.praiseand = praiseand.data.data;
      });
    }
  },
  created() {
    this.getPlayList(this.$route?.query?.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.id);
    next();
  }
};
</script>
  
<style lang="less" scoped>
.say-view {
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;

  .wrap {
    width: 100%;
    height: 100%;
    position: relative;

    .wrap-top {
      width: 100%;
      height: 100%;
      position: relative;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      div.card {
        position: relative;
        z-index: 310;
        height: 50px;
        text-align: center;
        display: flex;
        justify-content: space-between;
        align-items: center;

        img {
          width: 18rem;
          margin: 0 15rem;
        }

        h3 {
          flex: 1;
          font-size: 18rem;
          color: #333333;
          font-weight: 16;
        }
      }

      div.bg {
        width: 100%;
        height: 240rem;
        background-size: cover;
        background-position: center;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 309;

        div.img {
          position: relative;
          height: 100%;
          text-align: center;

          img {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
          }

          p {
            position: absolute;
            bottom: 20rem;
            left: 30rem;
            color: #a8a2a2;
          }
        }
      }

      div.t-section {
        position: absolute;
        left: 0;
        top: 40%;
        margin: 0 20rem;

        h1 {
          margin-bottom: 30rem;
          color: #333333;
          font-weight: 700;
          font-size: 20rem;
        }

        div.t-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30rem;

          span {
            img {
              width: 18rem;
            }
          }
        }
      }
    }

    .wrap-fot {
      width: 100%;
      height: 50px;
      position: absolute;
      bottom: 0;
      left: 0;
      background-color: #fdfdfd;
      display: flex;
      justify-content: space-between;
      align-items: center;

      form {
        margin-left: 20rem;

        input {
          width: 120rem;
          height: 30rem;
          border-radius: 5rem;
          border: 1rem solid #a8a2a2;
          outline-style: none;
        }
      }

      div.icon {
        display: flex;

        span {
          display: flex;
          margin: 0 20rem;

          p {
            font-size: 10rem;
            color: #a8a2a2;
          }

          img {
            width: 18rem;
          }
        }
      }
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 301;
      display: flex;
      flex-direction: column;

      div.clear {
        text-align: right;

        img {
          width: 40rem;
          margin: 10rem;
        }
      }

      div.icon {
        display: flex;
        flex-wrap: wrap;

        span {
          width: 100%;
          display: block;
          text-align: center;
          margin: 30rem 0;

          img {
            width: 35rem;
          }
        }
      }
    }
  }
}

.locadingmask {
  width: 100vw;
  height: calc(100vh - 50rem);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0rem;
  left: 0;

  background-color: #fff;
  z-index: 999;

  .locading {
    width: 154rem;
    height: 155rem;
    margin: 0 auto;

    background-image: url("@/assets/loading.jpg");
    background-repeat: no-repeat;
    animation-name: xxx;
    animation-duration: 3s;
    margin: 220rem auto;
    animation-iteration-count: infinite;
    animation-timing-function: steps(0, end);
  }
}
</style>