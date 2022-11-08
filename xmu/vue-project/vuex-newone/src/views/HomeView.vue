<template>
  <keep-alive>
    <div class="home animate__animated animate__fadeIn">
      <div class="nav-top">
        <div class="wrap">
          <div class="wrap-left" @click="show = !show;">
            <!-- $router.push({path:'/hmask' , query:{month:new Date().getMonth()}}) -->
            <h2 v-if="!showList">{{weather?.date.slice(8)}}</h2>
            <h2 v-else>{{showList?.date.slice(8)}}</h2>
            <p>{{setMonth}}{{year}}</p>
            <img src="@/assets/images/iocn_triangle.png" :class="{active:show , showActive:!show}" alt />
          </div>
          <div class="wrap-right">
            <span class="right">
              {{weather?.city_name}}·{{weather?.climate}}
              <span>{{weather?.temperature}}</span>
            </span>
          </div>
        </div>
      </div>
      <HomeMask v-if="show" @show-item="showList = $event ; show=false" />
      <HomeSection v-if="!show" :showList="showList" :dataList="dataList" :weather="weather" />
      <div v-if="loading" class="locadingmask">
        <div class="locading"></div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import HomeSection from "@/components/HomeSection.vue";
import HomeMask from "@/components/HomeMask.vue";
import { mapState, mapGetters } from "vuex";

export default {
  components: {
    HomeMask,
    HomeSection
  },
  data() {
    return {
      weather: null,
      dataList: [],
      show: false,
      loading: false,

      showList: null
    };
  },
  computed: {
    ...mapState(["year", "month", "date"]),

    ...mapGetters(["setMonth"])
  },
  created() {
    this.loading = true;

    Promise.all([
      this.axios.get(
        `https://apis.netstart.cn/one/channel/one/${this.getDate}`
      ),
      this.axios.get(
        `https://apis.netstart.cn/one/feeds/list/${this.getDateMonth}`
      )
    ]).then(([channel, feeds]) => {
      this.weather = channel.data.data.weather;
      this.dataList = feeds.data.data;
      this.loading = false;

    });
  }
};
</script>
<style lang="less" scoped>
.nav-top {
  width: 100%;
  height: 53px;
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 90;

  .wrap {
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
