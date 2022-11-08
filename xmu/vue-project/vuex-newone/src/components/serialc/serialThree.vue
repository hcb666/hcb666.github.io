<template>
  <keep-alive>

    <div class="serial-three">
      <div class="wrap">
        <ul class="item">
          <li v-for="b in byList" :key="b.id"
            @click="$router.push({path:'/serialDetails' , query:{id:b.serial_id,title:b.title}})">
            <div class="bg" :style="{backgroundImage : `url('${b.cover}')`}">
              <h5 class="finish" v-if="b?.finished!==finished">#已完结</h5>
              <h5 class="finish" v-else>#连载中</h5>
              <h1>《{{b?.title}}》</h1>
            </div>
            <div class="box">
              <h3>{{b?.forward}}</h3>
              <p>{{b?.subtitle}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="loading" class="locadingmask">
        <div class="locading"></div>
      </div>
    </div>

  </keep-alive>
</template>

<script>
// import { finished } from 'stream';

export default {
  props: {
    year: Number,
    finished: Boolean
  },
  data() {
    return {
      loading: false,

      byList: []
    };
  },
  created() {
    this.loading = true;

    this.axios
      .get(`https://apis.netstart.cn/one/find/serial/byyear/${this.year}`)
      .then(res => {
        this.loading = false;

        this.byList = res.data.data;
      });
  }
};
</script>

<style lang="less" scoped>
.serial-three {
  position: absolute;
  top: 50rem;
  left: 0;

  .wrap {
    margin: 0 20rem;

    ul.item {
      margin-bottom: 60rem;

      li {
        width: 335rem;
        margin: 20rem 0;
        box-shadow: 0 0 2rem 1rem #a8a8a8;
        border-radius: 5rem;

        .bg {
          position: relative;
          border-radius: 5rem 5rem 0 0;
          height: 140rem;
          background-position: 0 -30rem;
          background-size: cover;

          h1 {
            position: absolute;
            bottom: 20rem;
            left: 10rem;
            color: #ffffff;
            font-size: 15rem;
          }

          .finish {
            padding: 10rem;
            color: white;
          }
        }

        .box {
          padding: 5rem 0;
          margin: 0 10rem;

          h3 {
            color: #5e5e5e;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            word-break: normal;
          }

          p {
            color: #b4b4b4;
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