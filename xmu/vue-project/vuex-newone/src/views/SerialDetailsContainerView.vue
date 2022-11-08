<template>
  <div class="say-view animate__animated animate__fadeInUp">
    <keep-alive>
      <div class="wrap">
        <div class="wrap-top">
          <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
          <h3>连载</h3>
          <img src="@/assets/images/favourite_gray.png" alt />
        </div>
        <div class="wrap-section">
          <h1>{{content?.title}}</h1>
          <div class="box">
            <h3>{{content?.simple_author[0]}}</h3>
            <img src="@/assets/images/aliwx_reply_bar_show_menu_pressed.png" alt @click="serialListShow = true" />
          </div>
          <div v-html="content?.content" class="card" style="font-size:13rem;  line-height: 25rem;"></div>
          <p>{{content?.editor}}</p>
          <p>{{content?.copyright}}</p>
          <SerialDetailsContainerViewComponent id="component" :author="author" :rela="rela" :praiseand="praiseand" />
        </div>
        <div class="wrap-fot">
          <form action>
            <input type="text" placeholder="写一个评论" />
          </form>
          <div class="icon">
            <span>
              <img src="@/assets/images/feeds_laud_default.png" alt />
              <p>{{praisenum}}</p>
            </span>
            <span>
              <a href="#component">
                <img src="@/assets/images/bottom_comment.png" alt />
              </a>
              <p>{{commentnum}}</p>
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
        <div class="serialList-card animate__animated animate__fadeInUp" v-if="serialListShow">
          <div class="card">
            <div class="card-box">
              <img src="@/assets/images/close_pressed.png" @click="serialListShow = false" alt />
              <ul class="item">
                <li v-for="(s,index) in serialList" :key="index" @click="getPlayList(s);serialListShow=false">
                  <span>{{index+1}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="locadingmask">
        <div class="locading"></div>
      </div>
    </keep-alive>

  </div>
</template>
  
<script>
import SerialDetailsContainerViewComponent from "@/components/serialc/SerialDetailsContainerViewComponent.vue";
export default {
  components: {
    SerialDetailsContainerViewComponent
  },
  data() {
    return {
      content: null,
      author: [],
      rela: [],
      praiseand: null,
      commentnum: 0,
      praisenum: 0,
      show: false,
      serialList: [],
      loading: false,

      serialListShow: false
    };
  },
  methods: {
    getPlayList: function (id) {
      this.loading = true

      Promise.all([
        this.axios.get(
          `https://apis.netstart.cn/one/serialcontent/htmlcontent/${id}`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/author/list?content_id=${id}&category=2`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/relatedforwebview/serial/${id}`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/comment/praiseandtime/serial/${id}/0`
        )
      ]).then(([htmlcontent, author, rela, praiseand]) => {
        this.content = htmlcontent.data.data.json_content;
        this.commentnum = htmlcontent.data.data.commentnum;
        this.praisenum = htmlcontent.data.data.praisenum;
        this.author = author.data.data;
        this.rela = rela.data.data;
        this.praiseand = praiseand.data.data;
        this.loading = false
      });
    }
  },
  created() {
    this.getPlayList(this.$route?.query?.id);
    this.serialList = [...this.$route?.query?.serialList];
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
      position: relative;
      height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      p {
        margin-left: 15rem;
      }

      h1 {
        font-size: 20rem;
        margin: 20rem 0rem;
        margin-left: 15rem;
      }

      .box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20rem 15rem;

        h3 {
          font-size: 12rem;
        }

        img {
          width: 20rem;
        }
      }

      div.card {
        margin: 0 15rem;
        margin-bottom: 70rem;
        margin-top: 20rem;
        font-size: 14rem;
        color: #333333;
        font-weight: 500;
      }

      .found-compoents {
        margin-bottom: 100rem;
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
          border: 1rem solid #b9b9b9;
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
            margin-left: 3rem;
            color: #a8a2a2;
          }

          img {
            width: 18rem;
            height: 20rem;

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

    .serialList-card {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #262626c2;
      width: 100%;
      height: 100%;

      .card {
        width: 100%;
        background-color: #fff;
        transform: translateY(50%);

        .card-box {
          img {
            width: 30rem;
            margin-left: 20rem;
            margin-top: 10rem;
          }

          ul.item {
            display: flex;
            flex-wrap: wrap;
            margin: 0 20rem;
            padding: 20rem 0;

            li {
              width: 12%;
              margin: 10rem 0;
              text-align: center;

              span {
                color: #7676fc;
              }
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
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0rem;
  left: 0;
  background-color: #fff;
  z-index: 999;
  
  .locading {
    width: 154rem;
    height: 155rem;
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