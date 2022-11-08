<template>
  <keep-alive>

  <div class="found-music">
    <div class="wrap">

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="date">
          <div class="card">
            <span @click="show=true">
              {{year}}年{{month}}月
              <img src="@/assets/images/arrow_down_black.png" alt />
            </span>
          </div>
        </div>
        <div class="ul-card" v-for="(m ,i) in byList" :key="i">
          <div class="bor" v-if="m.articles.length">
            <p>{{m?.month >=10 ? m?.month : '0' + m?.month}}月</p>
          </div>
          <ul class="item">
            <li v-for="b in m?.articles" :key="b.id" @click="$router.push({path:'/music' , query:{id:b.id}})">
              <div class="card">
                <img :src="`${b.cover}`" alt />
                <div class="title">
                  <p>{{b.title}}</p>
                  <p>{{b.subtitle}}</p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
  </keep-alive>
</template>

<script>
// let _ = require("lodash");
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      byList: [],
      minDate: new Date(2012, 0, 1),
      maxDate: new Date(),
      // currentDate: new Date(),
      currentDate: 0,
      // date: null,
      show: false,
      loading: false,
      finished: false,
      m:
        new Date().getMonth() > 10
          ? new Date().getMonth()
          : "0" + new Date().getMonth()
    };
  },
  computed: {
    ...mapState(["year", "month", "date", "updatemonth"]),
    ...mapGetters(["setMonth"])
  },
  created() {
    this.getMonthArtics(`${this.year}-${this.month}`);
  },
  methods: {
    ...mapMutations(["ofMonth"]),
    getMonthArtics(date) {
      this.loading = true

      //   let month = this.currentMonth;
      let month = new Date().getMonth();
      if (date) {
        month = new Date(date).getMonth();
      }
      this.$axios(`https://apis.netstart.cn/one/find/bymonth/4/${date}`).then(
        ({ data }) => {
          this.loading = false

          // console.log({ date }, month);
          this.byList = [
            ...this.byList,
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
        // 2020-10
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
  mounted() {
  },
  watch: {

  }
};
</script>

<style lang="less" scoped>
.found-music {
  position: absolute;
  top: 20rem;
  left: 0;

  .wrap {
    margin: 0 20rem;

    .date-show {
      text-align: center;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 20;

      .date-wrap {
        width: 100%;
        height: 100%;
        background-color: rgba(51, 51, 51, 0.444);

        p {
          font-size: 20rem;
          transform: translateY(-70rem);
          color: #333;
          position: relative;
          z-index: 30;
        }
      }
    }

    .date {
      width: 100%;
      text-align: center;

      .card {
        span {
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 20rem;
            height: 20rem;
          }
        }

        p {
          text-align: center;
          background-color: #fff;
          color: #a0a0a0;
          position: relative;
          top: 8rem;
          left: 44%;
          width: fit-content;
          width: -webkit-fit-content;
          width: -moz-fit-content;
        }
      }
    }

    .ul-card {
      // margin-bottom: 60rem;
      // margin: 20rem 20rem;

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

        // margin-bottom: 60rem;
        li {
          div.card {
            display: flex;
            // margin: 20rem 20rem;
            margin: 20rem 0rem;

            img {
              width: 50rem;
              height: 50rem;
              border-radius: 10rem;
            }

            div.title {
              margin-left: 20rem;
              display: flex;
              flex-wrap: wrap;

              p {
                width: 100%;

                &:nth-child(1) {
                  font-weight: 700;
                  font-size: 15rem;
                  color: #333;
                }

                &:nth-child(2) {
                  font-size: 12rem;
                  color: #a6a6a6;
                }
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
  top: 0;
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