<template>
  <keep-alive>
    <div class="found-radio">
      <div class="wrap">
        <van-list v-model="loading" style="text-align:center" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="box-wrap">
            <div class="card" v-for="(m ,i) in contentList" :key="i">
              <div class="bor" v-if="m.articles.length">
                <p>{{m.month >=10 ? m.month : '0' + m.month}}月</p>
              </div>
              <ul class="item">
                <li v-for="c in m?.articles" :key="c.id" @click="$router.push({path:'/radio' , query:{id:c.id}})">
                  <div class="img">
                    <h5>{{c?.volume}}</h5>
                    <img :src="`${c?.cover}`" alt />
                    <h1>{{c?.title}}</h1>
                  </div>
                  <div class="icon">
                    <div class="f-icon">
                      <img :src="`${c?.author?.web_url}?imageView2/1/w/20/h/20/q/75`" alt />
                      <p>{{c?.author?.user_name}}</p>
                    </div>
                    <span>
                      <img src="@/assets/images/feeds_laud_default.png" alt />
                      <p>{{c?.like_count}}</p>
                    </span>
                    <span @click="show=true">
                      <img src="@/assets/images/discover_repost.png" alt />
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </van-list>
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
  </keep-alive>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      contentList: [],
      loading: false,
      finished: false,
      currentDate: 0,
      show: false
    };
  },
  computed: {
    ...mapState(["year", "month", "date", "updatemonth"]),
    ...mapGetters(["setMonth"])
  },
  // https://apis.netstart.cn/one/find/bymonth/8/2022-10
  methods: {
    ...mapMutations(["ofMonth"]),
    getMonthArtics(date) {
      this.loading = true

      //   let month = this.currentMonth;
      let month = new Date().getMonth();
      if (date) {
        month = new Date(date).getMonth();
      }
      this.$axios(`https://apis.netstart.cn/one/find/bymonth/8/${date}`).then(
        ({ data }) => {
          this.loading = false;

          this.contentList = [
            ...this.contentList,
            {
              id: date,
              month: month + 1,
              articles: data.data
            }
          ];

          this.$nextTick(() => {
            this.currentDate = date;
            this.loading = false;
          });
        }
      );
    },
    onLoad() {
      setTimeout(() => {
        // console.log("下拉加载");
        let d = this.currentDate ? new Date(this.currentDate) : new Date();
        let prevMonth = d.getMonth() - 1;
        if (prevMonth < 0) {
          d.setFullYear(d.getFullYear() - 1);
          d.setMonth(11);
        } else {
          d.setMonth(prevMonth);
        }
        let m = d.getMonth() + 1;
        m = m >= 10 ? m : "0" + m;
        // + "-" + "01";
        let date = d.getFullYear() + "-" + m;
        this.getMonthArtics(date);
      }, 1000);
    }
  },
  created() {
    this.getMonthArtics(`${this.year}-${this.month}`);
  }
};
</script>

<style lang="less" scoped>
.found-radio {
  position: absolute;
  top: 40rem;
  left: 0;

  .wrap {
    background-color: #fff;

    .box-wrap {
      .card {
        margin-top: 20rem;
        margin: 0 20rem;

        .bor {
          margin: 20rem 0;
          border-bottom: 1rem solid #dedede;
          position: relative;

          p {
            text-align: center;
            width: 40rem;
            position: absolute;
            left: 50%;
            margin-left: -20rem;
            bottom: -8rem;
            background-color: #fff;
            color: #a5a5a5;
            font-size: 13rem;
          }
        }

        ul.item {

          // margin: 0 20rem;
          li {
            margin: 10rem 0;

            .title {
              h5 {
                text-align: center;
                color: #a8a2a2;
                font-size: 12;
                padding: 20rem 0;
              }
            }

            .img {
              position: relative;

              img {
                border-radius: 10rem;
              }

              h1 {
                position: absolute;
                bottom: 20rem;
                left: 10rem;
                font-size: 15rem;
                color: #fff;
              }

              h5 {
                position: absolute;
                top: 10rem;
                left: 10rem;
                color: rgb(153, 153, 153);
              }
            }

            .icon {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20rem 0;

              .f-icon {
                display: flex;
                align-items: center;

                img {
                  border-radius: 50%;
                }

                p {
                  margin-left: 5rem;
                  color: #a6a6a6;
                }
              }

              span {
                margin: 0 20rem;
                display: flex;

                p {
                  margin-left: 5rem;
                  font-size: 10rem;
                  color: #a5a5a5;
                }

                img {
                  width: 20rem;
                  height: 20rem;
                }
              }
            }
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