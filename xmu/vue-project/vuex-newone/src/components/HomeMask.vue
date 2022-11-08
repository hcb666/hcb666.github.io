<template>
  <keep-alive>

    <div class="home-mask">
      <div class="wrap" ref="navCard">
        <van-list v-model="loading" style="text-align:center" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <div class="box-wrap">
            <div class="card" v-for="(m ,i) in months" :key="i">
              <div class="bor" v-if="m.articles.length">
                <p>{{m.month >=10 ? m.month : '0' + m.month}}月</p>
              </div>
              <ul class="item">
                <li v-for="item in m?.articles" :key="item.id" @click="$emit('show-item',item)">
                  <img :src="`${item.cover}?imageView2/1/w/150/h/100/q/75`" alt />
                  <p>{{item.date}}</p>
                </li>
              </ul>
            </div>
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
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  props: {
    show: Boolean
  },
  data() {
    return {
      months: [],
      loading: false,
      finished: false,
      currentDate: 0
    };
  },
  computed: {
    ...mapState(["year", "month", "date", "updatemonth"]),
    ...mapGetters(["setMonth"])
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
          console.log({ date }, month);
          this.loading = false;

          this.months = [
            ...this.months,
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
        let date = d.getFullYear() + "-" + m
        this.getMonthArtics(date);
      }, 1000);
    }
  },
  created() {
    this.getMonthArtics(this.currentDate);
  }
};
</script>
  
<style lang="less" scoped>
.home-mask {
  width: 100%;
  height: 100vh;
  background-color: #fff;
  z-index: 200;
  position: absolute;
  top: 60rem;
  left: 0;
  overflow-y: auto;

  .wrap {
    margin: 0 20rem;

    nav {
      width: 100%;
      height: 53rem;
      background-color: #fff;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 90;
      margin-bottom: 1rem;

      .nav-wrap {
        width: 100%;
        height: 100%;
        margin: 0 20rem;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .wrap-left {
          display: flex;
          align-items: flex-end;
          color: #333;

          h2 {
            font-size: 30rem;
            font-weight: 700;
          }

          p {
            font-size: 12rem;
            margin: 0 3rem;
            margin-bottom: 4rem;
            font-weight: 700;
          }

          img {
            width: 12rem;
            height: 8rem;
            margin-bottom: 7rem;

            &.active {
              transition: all 0.5s;
              transform: rotate(180deg);
            }

            &.showActive {
              transition: all 0.5s;
              transform: rotate(0deg);
            }
          }
        }

        .wrap-right {
          span.right {
            font-size: 12rem;
            color: #a0a0a0;
            position: relative;
            bottom: -6rem;
            font-weight: 600;
          }
        }
      }
    }

    .box-wrap {
      .card {
        margin-top: 20rem;

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
          width: 100%;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;

          li {
            height: 140rem;
            margin: 10rem 0;
            box-shadow: 0 0 2rem 0 #d8d8d8;
            text-align: center;

            p {
              transform: translateY(10rem);
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