<template>
  <div class="bydate-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="wrap-top">
        <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
        <h3>{{new Date().toLocaleDateString()}}</h3>
        <img src="@/assets/images/favourite_gray.png" alt />
      </div>
      <div class="wrap-section">
        <div class="s-card">
          <div class="bg" @click="showsection=true">
            <img :src="bydate ? `${bydate?.img_url}` : ''" alt />
          </div>
          <div class="title">
            <div class="t-box">
              <p>{{bydate?.title}}</p>
              <span>|</span>
              <p>{{bydate?.pic_info}}</p>
            </div>
            <h3>{{bydate?.forward}}</h3>
            <h5>{{bydate?.words_info}}</h5>
          </div>
        </div>
      </div>
      <div class="wrap-fot">
        <div class="f-icon">
          <img src="@/assets/images/discovery.png" alt />
          <span>小记</span>
        </div>
        <div class="icon">
          <span>
            <img src="@/assets/images/diary_icon.png" alt />
          </span>
          <span>
            <div class="bg1" v-if="!photographyListCol.map(o => o?.item_id).includes(bydate?.item_id)"
              @click="addPhotographyListCol({photographyCol:bydate})"></div>
            <div class="bg2" v-else @click="removePhotographyListCol({photographyCol:bydate})"></div>
          </span>
          <span class="icon-two">
            <div class="bg1" v-if="!photographyList.map(o => o.id).includes(bydate?.id)"
              @click="addPhotographyList({photography:bydate})"></div>
            <div class="bg2" v-else @click="removePhotographyList({photography:bydate})"></div>
            <span>{{photographyList.map(o => o.id).includes(bydate?.id) ? (photographyList.map(o =>
            o).filter(o => o.id == bydate?.id)[0]?.like_count + 1) : bydate?.like_count}}</span>
          </span>
          <span @click="show=true">
            <img src="@/assets/images/discover_repost.png" alt />
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
      <div class="section-mask animate__animated animate__fadeInUp" v-if="showsection">
        <div class="s-mask" @click="showsection = false">
          <div class="card" @click.stop>
            <h3>{{bydate?.share_info?.title}}</h3>
            <img :src="bydate ? `${bydate?.img_url}` : ''" alt />
            <div class="t-box">
              <p>{{bydate?.title}}</p>
              <span>|</span>
              <p>{{bydate?.pic_info}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      show: false,
      showsection: false,
      loading: false,

      bydate: null
    };
  },
  computed: {
    ...mapState(["photographyList", "photographyListCol"]),
  },
  methods: {
    ...mapMutations(["addPhotographyList", "removePhotographyList", "addPhotographyListCol", "removePhotographyListCol"]),
    getPlayList: function (date) {
      this.loading = true;

      this.axios
        .get(`https://apis.netstart.cn/one/hp/bydate/${date}`)
        .then(res => {
          this.bydate = res.data.data;
          this.loading = false;

        });
    }
  },
  created() {
    this.getPlayList(this.$route.query.date);
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.date);
    next();
  }
};
</script>

<style lang="less" scoped>
.bydate-view {
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
      height: 50px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1rem solid #e6e6e6;

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

    .wrap-section {
      width: 100%;
      height: 70vh;
      border-radius: 5rem;

      .s-card {
        height: 100%;
        margin: 10rem 20rem;
        box-shadow: 0 0 3rem 0 #a8a2a2;
        border-radius: 5rem;

        div.bg {
          img {
            border-radius: 5rem 5rem 0 0;
          }
        }

        div.title {
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .t-box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10rem 0;
            color: #a8a2a2;

            span {
              padding: 0 5rem;
            }
          }

          h3 {
            font-size: 15rem;
            color: #333333;
            margin: 0 20rem;
          }

          h5 {
            margin: 0 auto;
            margin-bottom: 20rem;
            font-size: 12rem;
            color: #a8a2a2;
          }
        }
      }
    }

    .wrap-fot {
      width: 100%;
      height: 50px;
      margin-top: 10rem;
      background-color: #fdfdfd;
      display: flex;
      justify-content: space-between;
      align-items: center;

      div.f-icon {
        margin-left: 20rem;
        display: flex;
        align-items: center;

        img {
          width: 18rem;
          // height: 18rem;
          height: auto;
        }

        span {
          margin-left: 5rem;
          color: #a8a2a2;
        }
      }

      div.icon {
        display: flex;
margin-right: 10rem;
        span {
          margin: 0 10rem;
          display: flex;
          p {
            font-size: 10rem;
            color: #a8a2a2;
          }
          img {
            width: 20rem;
            height: 20rem;
          }
          .bg1 {
            width: 20rem;
            height: 20rem;
            background-image: url(@/assets/images/bubble_collect.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }

          .bg2 {
            width: 20rem;
            height: 20rem;
            background-image: url(@/assets/images/bubble_collected.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }
        }

        .icon-two {
          display: flex;
          align-items: center;
          span {
            transform: scale(0.8);
            color: #a8a2a2;
          }
          .bg1 {
            width: 20rem;
            height: 20rem;
            background-image: url(@/assets/images/feeds_laud_default.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
          }

          .bg2 {
            width: 20rem;
            height: 20rem;
            background-image: url(@/assets/images/bottom_laud_selected.png);
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
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

    .section-mask {
      width: 100%;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 305;
      color: #e8e8e8;

      .s-mask {
        height: 100%;
        margin: 0 20rem;

        .card {
          transform: translateY(100rem);

          h3 {
            margin-bottom: 10rem;
            margin-left: 5rem;
          }

          .t-box {
            display: flex;
            align-items: center;
            margin: 10rem 0;
            margin-left: 5rem;

            span {
              padding: 0 5rem;
            }
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