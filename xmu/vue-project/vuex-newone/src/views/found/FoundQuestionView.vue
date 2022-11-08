<template>
  <div class="say-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="wrap-top">
        <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
        <h3>问答</h3>
        <img src="@/assets/images/favourite_gray.png" alt />
      </div>
      <div class="wrap-section">
        <h1>{{question?.title}}</h1>
        <div class="card">
          <div class="c-top">
            <p>{{question?.json_content?.simple_author[0]}}</p>
            <h3>{{question?.json_content?.question_brief}}</h3>
          </div>
          <div class="c-fot">
            <p class="title">{{question?.json_content?.simple_answerer}}</p>
            <h3
              v-html="question?.json_content?.content"
              style="color:#333;font-size:14rem; font-weight: 500;line-height:30rem"
            ></h3>
            <div class="introduce">
              <p>{{question?.json_content?.editor}}</p>
              <p>{{question?.json_content?.copyright}}</p>
            </div>
          </div>
        </div>
        <FoundQuestionViewComponent :author="author" :praiseand="praiseand" />
      </div>
      <div class="wrap-fot">
        <form action>
          <input type="text" placeholder="写一个评论" />
        </form>
        <div class="icon">
          <span>
            <img src="@/assets/images/feeds_laud_default.png" alt />
            <p>{{question?.praisenum}}</p>
          </span>
          <span>
            <img src="@/assets/images/bottom_comment.png" alt />
            <p>{{question?.commentnum}}</p>
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
import FoundQuestionViewComponent from "@/components/foundc/FoundQuestionViewComponent.vue";

export default {
  components: {
    FoundQuestionViewComponent
  },
  data() {
    return {
      content: null,
      author: [],
      praiseand: null,
      show: false,
      loading: false,

      question: null
    };
  },
  methods: {
    getPlayList: function(id) {
      this.loading = true;

      Promise.all([
        this.axios.get(
          `https://apis.netstart.cn/one/question/htmlcontent/${id}`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/author/list?content_id=${id}&category=3`
        ),
        this.axios.get(
          `https://apis.netstart.cn/one/comment/praiseandtime/question/${id}/0`
        )
      ]).then(([res, author, praiseand]) => {
        this.question = res.data.data;
        this.author = author.data.data;
        this.praiseand = praiseand.data.data;
        this.loading = false;

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
      margin: 0 20rem;

      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      h1 {
        font-size: 20rem;
        color: #333333;
        font-weight: 700;
        margin: 25rem 0;
      }
      div.card {
        div.c-top {
          border-bottom: 1rem solid #dadada;
          padding-bottom: 30rem;
          p {
            font-size: 12rem;
            color: #333333;
            margin: 20rem 0;
          }
          h3 {
            font-size: 15rem;
            color: #333333;
          }
        }
        div.c-fot {
          margin-bottom: 100rem;
          p.title {
            font-size: 12rem;
            color: #333333;
            margin: 20rem 0;
          }
          div.introduce {
            margin-top: 30rem;
            p {
              color: #959595;
              margin: 10 rem 0;
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
    margin:  0 auto;

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