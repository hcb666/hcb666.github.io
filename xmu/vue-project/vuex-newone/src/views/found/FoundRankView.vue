<template>
  <div class="rank-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="title">
        <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
        <h3>{{title}}</h3>
      </div>
      <ul class="item">
        <li v-for="(r,index) in rank" :key="r.id" @click="$router.push({path:'/say' , query:{id:r.id}})">
          <div class="card">
            <div class="img">
              <img :src="`${r.cover}`" alt />
              <p class="arrange">No.{{index+1}}</p>
            </div>
            <div class="box">
              <h3>{{r.title}}</h3>
              <p>{{r.subtitle}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      rank: [],
      title: ""
    };
  },
  methods: {
    getPlayList(id) {
      this.loading = true
      this.axios
        .get(`https://apis.netstart.cn/one/find/rank/${id}`)
        .then(res => {
          this.rank = res.data.data;
          this.loading = false
        });
    }
  },
  created() {
    this.getPlayList(this.$route?.query?.id);
    this.title = this.$route?.query?.title;
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.id);
    next();
  }
};
</script>

<style lang="less" scoped>
.rank-view {
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;

  .wrap {
    margin: 0 20rem;
    height: 100%;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    div.title {
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 9;
      background-color: #fff;
      display: flex;
      align-items: center;
      padding: 20rem 0;

      img {
        width: 18rem;
        margin-right: 10rem;
      }

      h3 {
        font-size: 15rem;
        color: #333;
        font-weight: 600;
      }
    }

    ul.item {
      margin-top: 60rem;

      li {
        margin: 20rem 0;

        &:nth-child(1) .card div.img p.arrange {
          background-color: rgb(191, 0, 0);
        }

        &:nth-child(2) .card div.img p.arrange {
          background-color: rgb(221, 88, 88);
        }

        .card {
          display: flex;

          div.img {
            position: relative;

            img {
              width: 60rem;
              border-radius: 10rem;
            }

            p.arrange {
              position: absolute;
              top: 0;
              left: 0;
              width: 40rem;
              height: 15rem;
              background-color: #ffc578;
              border-radius: 10rem 0rem 12rem 0rem;
              text-align: center;
              line-height: 15rem;
              color: #fff;
            }

          }

          div.box {
            flex: 1;
            margin-left: 20rem;

            h3 {
              font-size: 15rem;
              color: #333;
              font-weight: 600;
            }

            p {
              margin: 10rem 0;
              font-size: 12rem;
              color: #a6a6a6;
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