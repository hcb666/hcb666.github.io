<template>
  <div class="topic-view animate__animated animate__fadeInUp">
    <div class="wrap" :style="{backgroundColor:topic?`${topic?.bg_color}` : ''}">
      <div class="wrap-top">
        <div class="top-top">
          <img class="icon" src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
          <h3>专题</h3>
        </div>
        <!-- <img src="@/assets/images/favourite_gray.png" alt /> -->
        <div class="bg" :style="{backgroundImage:topic ? `url('${topic?.json_content?.special?.cover}')` : ''}"></div>
        <div class="card">
          <h1>{{topic?.share_list?.qq?.title}}</h1>
          <p>{{topic?.share_list?.qq?.desc}}</p>
        </div>
        <ul class="item">
          <li v-for="one in topic?.json_content?.oneDataArticles" :key="one.id" @click="
            $router.push({
              path: '/say',
              query: { id: one.item_id, category: one.category, model: 1 },
            })
          ">
            <div class="list-box">
              <div class="img">
                <!--  -->
                <img :src=" one ? `${one?.img_url}?imageView2/1/w/335/h/220/q/75` : ''" alt />
                <div class="img-mask">
                  <h1>{{one.title}}</h1>
                </div>
              </div>
              <div class="introduce">
                <h3>{{one?.forward}}</h3>
                <div class="icon">
                  <p>{{one?.author?.user_name}}</p>
                  <span class="iocn-box">
                    <span>
                      <div class="bg1" v-if="!photographyList.map(o => o.id).includes(one?.id)"
                        @click="addPhotographyList({photography:one})"></div>
                      <div class="bg2" v-else @click="removePhotographyList({photography:one})"></div>
                      <span>{{photographyList.map(o => o.id).includes(one?.id) ? (photographyList.map(o =>
                      o).filter(o => o.id == one?.id)[0]?.like_count + 1) :
                      one?.like_count}}</span>
                    </span>
                    <span @click.stop="show=true">
                      <img src="@/assets/images/share_image.png" alt />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </li>
          <FoundTopicViewComponent id="component" :praiseand="praiseand" />
        </ul>
      </div>
      <div class="wrap-fot" :style="{backgroundColor:topic?`${topic?.bg_color}` : ''}">
        <form action>
          <input type="text" placeholder="写一个评论" />
        </form>
        <div class="icon">
          <span>
            <img src="@/assets/images/feeds_laud_default.png" alt />
            <p>{{topic?.praisenum}}</p>
          </span>
          <span>
            <a href="#component">
              <img src="@/assets/images/bottom_comment.png" alt />

            </a>
            <p>{{topic?.commentnum}}</p>
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
</template>

<script>
import { mapState, mapMutations } from "vuex";

import FoundTopicViewComponent from "@/components/foundc/FoundTopicViewComponent.vue";

export default {
  components: {
    FoundTopicViewComponent
  },
  data() {
    return {
      show: false,
      showsection: false,
      topic: null,
      author: [],
      rela: [],
      loading: false,
      praiseand: null
    };
  },
  computed: {
    ...mapState(["photographyList", "photographyListCol"]),
  },
  methods: {
    ...mapMutations(["addPhotographyList", "removePhotographyList", "addPhotographyListCol", "removePhotographyListCol"]),

    getPlayList: function (id) {
      this.loading = true;

      Promise.all([
        this.axios.get(`https://apis.netstart.cn/one/topic/htmlcontent/${id}`),
        this.axios.get(
          `https://apis.netstart.cn/one/comment/praiseandtime/essay/${id}/0`
        )
      ]).then(([res, praiseand]) => {
        this.topic = res.data.data;
        this.praiseand = praiseand.data.data;
        this.loading = false;
        console.log(praiseand);
      });
    }
  },
  created() {
    this.getPlayList(this.$route.query.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.date);
    next();
  }
};
</script>

<style lang="less" scoped>
.topic-view {
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

      .top-top {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 36rem;
        background-color: #fff;
        position: fixed;
        z-index: 100;

        img.icon {
          width: 24rem;
          position: absolute;
          z-index: 100;
          left: 10rem;
        }

        h3 {
          font-size: 14rem;
          position: relative;
          z-index: 100;
        }
      }

      &::-webkit-scrollbar {
        display: none;
      }


      div.bg {
        margin: 36rem 0;
        width: 100%;
        height: 240rem;
        background-position: center;
        background-size: cover;

      }

      div.card {
        margin: 0 20rem;

        h1 {
          font-size: 20rem;
          color: #333;
          font-weight: 700;
        }

        p {
          font-size: 12rem;
          // line-height: 24rem;
          margin-top: 8rem;
          font-weight: 400;
          color: rgb(46, 46, 46);
        }
      }

      ul.item {
        width: 100%;

        li {
          margin: 20rem 0;

          div.list-box {
            background-color: #fff;
            margin: 0 15rem;

            box-shadow: 0 0 1rem 0 #333;

            div.img {
              width: 100%;
              position: relative;

              .img-mask {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: #33333375;

                h1 {
                  font-size: 20rem;
                  color: #fdfdfd;
                  position: absolute;
                  bottom: 20rem;
                  left: 20rem;
                }
              }
            }

            div.introduce {
              h3 {
                padding: 20rem 15rem;
                font-size: 13rem;
                font-weight: 400;
                color: #333;
                line-height: 25rem;
              }

              div.icon {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10rem 15rem;

                p {
                  color: #a8a2a2;
                }

                span.iocn-box {
                  display: flex;

                  span {
                    display: flex;
                    margin: 0 5rem;
                    align-items: center;
                    color: #a8a2a2;

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

                    p {
                      color: #a8a2a2;
                      margin-left: 3rem;
                    }

                    img {
                      width: 18rem;
                      height: 16rem;
                    }
                  }
                }
              }
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
          background-color: transparent;
        }
      }

      div.icon {
        display: flex;

        span {
          display: flex;
          margin: 0 20rem;
          position: relative;

          p {
            font-size: 10rem;
            color: #a8a2a2;
            position: absolute;
            right: -22rem;
            top: -4rem;
          }

          img {
            width: 18rem;
            height: 18rem;
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