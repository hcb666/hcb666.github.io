<template>
  <keep-alive>

  <div class="found-author">
    <div class="wrap">
      <h1>热门作者</h1>
      <ul class="item">
        <li v-for="n in nameList" :key="n.user_id"
          @click="$router.push({path:'/author' , query:{id:n?.user_id,name:n?.user_name,desc:n?.desc,total:n?.fans_total,img:n?.web_url}})">
          <div class="img">
            <img :src="`${n.web_url}?imageView2/1/w/40/h/40/q/75`" alt />
          </div>
          <div class="box">
            <h3>{{n?.user_name}}</h3>
            <p>{{n?.desc}}</p>
          </div>
          <div class="btn">
            <a href="javascript:;">
              <p>关注</p>
            </a>
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
      nameList: []
    };
  },
  created() {
    this.loading = true

    this.axios.get("https://apis.netstart.cn/one/author/hot").then(res => {
      this.nameList = res.data.data;
      this.loading = false

    });
  }
};
</script>

<style lang="less" scoped>
.found-author {
  position: absolute;
  top: 30rem;
  left: 0;

  .wrap {
    margin: 0 20rem;

    h1 {
      font-size: 15rem;
      color: #333;
      font-weight: 600;
      margin: 20rem 0;
    }

    ul.item {
      margin-bottom: 60rem;

      li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 20rem 0;

        div.img {
          img {
            border-radius: 50%;
          }
        }

        div.box {
          flex: 1;
          margin-left: 10rem;

          h3 {
            font-size: 15rem;
            color: #333;
          }

          p {
            font-size: 12rem;
            color: #a8a2a2;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
        }

        div.btn {
          width: 40rem;
          height: 24rem;
          line-height: 20rem;
          text-align: center;
          border: 1rem solid rgb(128, 128, 128);
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 50rem;

          a {
            color: rgb(128, 128, 128);
            text-decoration: none;

            p {
              font-size: 5rem;
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