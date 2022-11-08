<template>
  <div class="search animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="input">
        <form action>
          <input type="text" placeholder="在这里写下你想寻找的" v-model="value" @keyup.enter="getSearch(value);show=true" />
          <span @click="$router.push({path:'/found' , query:{}})">取消</span>
        </form>
      </div>
      <div class="recommended">
        <div class="card">
          <!-- <p v-for="(k,index) in keyworlds" :key="index" @click="$router.push({path:'/found'}),activeIndex=k.id">{{k.text}}</p> -->
          <p @click="$router.push({path:'/found'})">图文</p>
          <p @click="$router.push({path:'/found'})">问答</p>
          <p @click="$router.push({path:'/found'})">阅读</p>
          <p @click="$router.push({path:'/found'})">连载</p>
          <p @click="$router.push({path:'/found'})">影视</p>
          <p @click="$router.push({path:'/found'})">音乐</p>
          <p @click="$router.push({path:'/found'})">电台</p>
        </div>
      </div>
      <SearchViewComponent v-if="result && show" :result="result" />
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
</template>

<script>
import SearchViewComponent from "@/components/searchc/SearchViewComponent.vue";

let _ = require("lodash");
export default {
  components: {
    SearchViewComponent
  },
  data() {
    return {
      value: "",
      show: false,
      loading: false,

      result: null,
      // keyworlds: ["图文","问答","阅读","连载","影视","音乐","电台"]
    };
  },
  methods: {
    getSearch(val) {
      this.loading = true;

      if (val != "") {
        Promise.all([
          this.axios.get(`https://apis.netstart.cn/one/search/hp/${val}/0`),
          this.axios.get(
            `https://apis.netstart.cn/one/search/reading/${val}/0`
          ),
          this.axios.get(`https://apis.netstart.cn/one/search/music/${val}/0`),
          this.axios.get(`https://apis.netstart.cn/one/search/movie/${val}/0`),
          this.axios.get(`https://apis.netstart.cn/one/search/radio/${val}/0`),
          this.axios.get(`https://apis.netstart.cn/one/search/author/${val}/0`)
        ]).then(([hp, reading, music, movie, radio, author]) => {
          this.loading = false;
          this.result = {
            // ...this.result,
            hpList: hp.data.data.list,
            readingList: reading.data.data.list,
            musicList: music.data.data.list,
            movieList: movie.data.data.list,
            radioList: radio.data.data.list,


            authorList: author.data.data.list
          };
        });
      }
    }
  },
  created() {
    this.lodashGetSearch = _.debounce(this.getSearch, 500);
  },
  watch: {
    value(newValue) {
      this.lodashGetSearch(newValue);
      //   this.getSearch(newValue);
    }
  }
};
</script>

<style lang="less" scoped>
.search {
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 300;

  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ebebeb;
    display: flex;
    flex-direction: column;

    .input {
      padding: 10rem;

      form {
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
          flex: 1;
          margin-right: 10rem;
          border: none;
          outline-style: none;
          padding: 3rem 0;
          padding-left: 10rem;
        }

        span {
          font-size: 12rem;
          color: #666666;
        }
      }
    }

    .recommended {
      background-color: #fff;
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .card {
        p {
          margin: 30rem 0;
          color: #7f7f7f;
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
  top: 50rem;
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