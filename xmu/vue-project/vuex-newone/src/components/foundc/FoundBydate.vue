<template>
  <keep-alive>

  <div class="found-bydate">
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
            <p>{{m.month >=10 ? m.month : '0' + m.month}}月</p>
          </div>
          <ul class="item">
            <li v-for="b in m?.articles" :key="b.id" @click="$router.push({path:'/bydate' , query:{date:b.date}})">
              <div class="card">
                <img :src="`${b.cover}?imageView2/1/w/150/h/100/q/75`" alt />
                <p>{{b.date}}</p>
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
      finished: false
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
      this.loading = true;

      //   let month = this.currentMonth;
      let month = new Date().getMonth();
      if (date) {
        month = new Date(date).getMonth();
      }
      this.$axios(`https://apis.netstart.cn/one/feeds/list/${date}`).then(
        ({ data }) => {
          // console.log({ date }, month);
          this.byList = [
            ...this.byList,
            {
              id: date,
              month: month + 1,
              articles: data.data
            }
          ];
          this.loading = false;

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
.found-bydate {
  position: absolute;
  top: 20rem;
  left: 0;

  .wrap {
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
        margin: 0 20rem;

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
      margin-bottom: 60rem;
      margin: 20rem 20rem;

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
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        li {
          // width: 39%;
          height: 140rem;
          margin: 10rem 0rem;
          border-radius: 5rem;
          box-shadow: 0 0 1rem 0 #a6a6a6;

          .card {
            text-align: center;

            img {
              border-radius: 5rem 5rem 0 0;
            }

            p {
              padding: 10rem 0;
              font-size: 14rem;
              color: #a0a0a0;
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