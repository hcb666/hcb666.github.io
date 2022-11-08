<template>
  <keep-alive>
    <div class="found-toppic">
      <div class="wrap">
        <ul class="item">
          <li v-for="b in bannerList" :key="b.id" @click="$router.push({path:'/topic' , query:{id:b.content_id}})">
            <div class="card">
              <div class="img">
                <!-- ?imageView2/1/w/150/h/100/q/75 -->
                <img :src="b ? `${b.cover}` : ''" alt />
                <p>#专题</p>
              </div>
              <h3>{{b?.title}}</h3>
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
  data() {
    return {
      loading: false,
      bannerList: []
    };
  },
  created() {
    this.loading = true;

    this.axios.get("https://apis.netstart.cn/one/banner/list/4").then(res => {
      this.bannerList = res.data.data;
      this.loading = false;

    });
  }
};
</script>

<style lang="less" scoped>
.found-toppic {
  position: absolute;
  top: 20rem;
  left: 0;

  .wrap {
    margin: 0 20rem;

    ul.item {
      margin-bottom: 60rem;

      li {
        width: 100%;
        // height: 140rem;
        box-shadow: 0 0 3rem 0 #ababab;
        margin: 40rem 0;
        border-radius: 5rem;

        div.card {
          div.img {
            position: relative;

            img {
              border-radius: 5rem 5rem 0 0;
            }

            p {
              position: absolute;
              left: 5rem;
              bottom: 10rem;
              color: rgb(168, 168, 168);
            }
          }

          h3 {
            line-height: 50rem;
            font-size: 15rem;
            font-weight: 700;
            color: #333;
            margin-left: 5rem;
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