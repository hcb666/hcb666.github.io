<template>
  <div class="author-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="card-name">
        <div class="clear">
          <img class="icon" src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
        </div>
        <div class="name">
          <img :src="`${img}?imageView2/1/w/50/h/50/q/75`" alt />
          <h3>{{name}}</h3>
          <p>{{desc}}</p>
          <div class="box">
            <div class="btn">
              <a href="javascript:;">
                <span>关注</span>
                <!-- <span>已关注</span> -->
              </a>
            </div>
            <p>{{total}}关注</p>
          </div>
        </div>
      </div>
      <div class="card" v-for="a in author" :key="a.id" @click="
        $router.push({
          path: '/say',
          query: {
            id: a.item_id,
            category: a.category,
            model: a.category,
          },
        })
      ">
        <p class="title" v-if="a?.category == 1  && !a?.tag_list.length">-阅读-</p>
        <p class="title" v-if="a?.category == 1 && a?.tag_list.length">寒暄-一下-</p>
        <p class="title" v-if="a?.category == 2">-连载-</p>
        <p class="title" v-if="a?.category == 3">-问答-</p>
        <p class="title" v-if="a?.category == 4">-音乐-</p>
        <p class="title" v-if="a?.category == 5">-影视-</p>
        <p class="title" v-if="a?.category == 8">-电台-</p>
        <div class="card-box">
          <div class="box-title">
            <h3>{{a?.title}}</h3>
            <p>文 / {{a?.author?.user_name}}</p>
          </div>
          <h5>{{a?.share_info?.content}}</h5>
          <img class="bg" :src="`${a?.img_url}`" alt />
          <div class="icon">
            <span>
              <div class="bg1" v-if="!photographyList.map(o => o.id).includes(a?.id)"
                @click="addPhotographyList({photography:a})"></div>
              <div class="bg2" v-else @click="removePhotographyList({photography:a})"></div>
              <span>{{photographyList.map(o => o.id).includes(a?.id) ? (photographyList.map(o =>
              o).filter(o => o.id == a?.id)[0]?.like_count + 1) : a?.like_count}}</span>
            </span>
            <span @click="show=true">
              <img src="@/assets/images/discover_repost.png" alt />
            </span>
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
// category
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      author: [],
      show: false,
      loading: false,
      name: "",
      desc: "",
      total: "",
      img: ""
    };
  },
  computed: {
    ...mapState(["photographyList", "photographyListCol"]),
  },
  methods: {
    ...mapMutations(["addPhotographyList", "removePhotographyList", "addPhotographyListCol", "removePhotographyListCol"]),

    getPlayList: function (id) {
      this.loading = true

      this.axios
        .get(
          `https://apis.netstart.cn/one/author/works?author_id=${id}&page_num=0`
        )
        .then(res => {
          this.loading = false

          this.author = res.data.data;
        });
    }
  },
  created() {
    this.name = this.$route?.query?.name;
    this.desc = this.$route?.query?.desc;
    this.total = this.$route?.query?.total;
    this.img = this.$route?.query?.img;
    this.getPlayList(this.$route?.query?.id);
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.id);
    next();
  }
};
</script>

<style lang="less" scoped>
.author-view {
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
    background-color: #e9e9e9;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    .card-name {
      background-color: #fff;
      width: 100%;
      position: relative;

      .clear {
        position: absolute;
        top: 10rem;
        left: 20rem;

        img.icon {
          width: 20rem;
        }
      }

      .name {
        text-align: center;
        padding: 20rem 0 0 0;
        margin-bottom: 10rem;

        img {
          border-radius: 50%;
        }

        h3 {
          font-size: 15rem;
          color: #333;
          margin: 10rem 0;
          font-weight: 600;
        }

        p {
          font-size: 12rem;
          color: #333;
          margin: 10rem 0;
          font-weight: 600;
        }

        .box {
          text-align: center;

          .btn {
            width: 40rem;
            height: 24rem;
            margin: 0 auto;
            line-height: 24rem;
            border: 1rem solid #333;
            border-radius: 3rem;

            a {
              text-decoration: none;
              color: #333;
            }
          }

          p {
            font-size: 12rem;
            color: #adadad;
            margin: 0;
            padding: 10rem 0;
          }
        }
      }
    }

    .card {
      background-color: #fff;
      margin: 10rem 0;

      p.title {
        text-align: center;
        padding: 10rem 0;
        color: #adadad;
        font-size: 12rem;
      }

      .card-box {
        margin: 0 20rem;

        .box-title {
          padding: 10rem 0;

          h3 {
            font-size: 15rem;
            color: #333;
            font-weight: 600;
          }

          p {
            font-size: 12rem;
            color: #adadad;
          }
        }

        h5 {
          padding: 10rem 0;
          font-size: 12rem;
          color: #a1a1a1;
        }

        img.bg {
          border-radius: 10rem;
        }

        .icon {
          display: flex;
          justify-content: end;
          align-items: center;

          span {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 5rem;
            padding: 10rem 0;

            span {
              color: #adadad;
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

            img {
              // width: 20rem;

              width: 20rem;
              height: 20rem;
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
  top: 0;
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