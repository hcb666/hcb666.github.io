<template>
  <keep-alive>
    <div class="serial-details-view">
      <div class="wrap">
        <div class="title">
          <img src="@/assets/images/return_image_4_0_night.png" alt @click="$router.back()" />
          <h3>{{title}}</h3>
        </div>
        <ul class="item">
          <li v-for="s in serial" :key="s.id"
            @click="$router.push({path:'/serialDetailsContainer' , query:{id:s.id,serialList:s.serial_list}})">
            <div class="card">
              <div class="img">
                <img :src="`${s.cover}`" alt />
              </div>
              <div class="box">
                <h3>{{s.title}}</h3>
                <p>{{s.subtitle}}</p>
              </div>
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
export default {
  components: {
    // FoundTopicViewComponent
  },
  data() {
    return {
      title: null,
      loading: false,

      serial: []
    };
  },
  methods: {
    getPlayList: function (id) {
      this.loading = true

      this.axios
        .get(`https://apis.netstart.cn/one/find/serial/list/${id}`)
        .then(res => {
          this.serial = res.data.data;
          this.loading = false

        });
    }
  },
  created() {
    this.getPlayList(this.$route.query.id);
    this.title = this.$route?.query?.title;
  },
  beforeRouteUpdate(to, from, next) {
    this.getPlayList(to.query.date);
    next();
  }
};
</script>

<style lang="less" scoped>
.serial-details-view {
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
      display: flex;
      align-items: center;
      margin: 20rem 0;

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
      li {
        margin: 20rem 0;

        .card {
          display: flex;

          div.img {
            img {
              width: 50rem;
              border-radius: 10rem;
            }
          }

          div.box {
            flex: 1;
            margin-left: 10rem;

            h3 {
              font-size: 13rem;
              color: #333;
              font-weight: 600;
            }

            p {
              margin: 10rem 0;
              font-size: 12rem;
              color: #a6a6a6;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }
          }
        }
      }
    }
  }
}
</style>