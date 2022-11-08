<template>
  <div class="search" :class="{active: o?.id === songId}">
    <div class="search-big">
      <div class="search-input">
        <div class="input-icon">
          <i class="fa fa-search search-icon" @click="getSearchResult(value)"></i>
          <i class="fa fa-times-circle search-icon-two" v-show="value" @click="
            value = '';
            searchRes = null;
          "></i>
        </div>
        <input type="text" placeholder="搜索歌曲、歌手、专辑" v-model="value" @focus="searchRes = null"
          @keyup.enter="getSearchResult(value)" />
      </div>
    </div>
    <div v-show="!suggests?.length">
      <section class="hots-style">
        <h3>热门搜索</h3>
        <ul class="hots">
          <li v-for="(o, i) in hots" :key="i" @click="
            value = o.first;
            getSearchResult(o.first);
          ">{{ o.first }}</li>
        </ul>
      </section>
      <section class="history-style">
        <ul class="history">
          <li v-for="(item, i) in history" :key="i" @click="
            value = item;
            getSearchResult(item);
          ">
            <i class="history-two"></i>
            <span class="search-text">
              <h5>{{ item }}</h5>
              <i class="fa fa-times history-one" @click.stop="history = history.filter((o) => o !== item)"></i>
            </span>
          </li>
        </ul>
      </section>
    </div>

    <ul class="suggests" v-if="suggests?.length && !searchRes">
      <h3 class="suggests-title">搜索：“{{ value }}"</h3>
      <li v-for="(o, i) in suggests" :key="i" @click="
        getSearchResult(o.keyword);
        value = o.keyword;
      ">
        <i class="fa fa-search"></i>
        <h5>{{ o.keyword }}</h5>
      </li>
    </ul>

    <ul class="search-search" v-if="searchRes">
      <li v-for="(o, i) in searchRes && searchRes.songs" :key="i" @click="$emit('update-searchsong',o)">
        <div class="search-text">
          <h5>{{ o.name }}</h5>
          <i v-show="o.copyrightId !== 0"></i>
          <div class="search-to" v-for="songers in o.ar" :key="songers.id">{{ songers.name }} &nbsp;</div>
          <span>- {{ o.al?.name }}</span>
        </div>
        <div v-if="o?.id !== songId" class="play-icon"></div>
        <div v-else class="play-icon active" :class="{ playing: playing }">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </li>
    </ul>
    <svg class="loading" v-show="loading" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; display: block" width="200px" height="200px" viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid">
      <g transform="translate(80,50)">
        <g transform="rotate(0)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="1">
            <animateTransform attributeName="transform" type="scale" begin="-0.875s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.875s" />
          </circle>
        </g>
      </g>
      <g transform="translate(71.21320343559643,71.21320343559643)">
        <g transform="rotate(45)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.875">
            <animateTransform attributeName="transform" type="scale" begin="-0.75s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.75s" />
          </circle>
        </g>
      </g>
      <g transform="translate(50,80)">
        <g transform="rotate(90)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.75">
            <animateTransform attributeName="transform" type="scale" begin="-0.625s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.625s" />
          </circle>
        </g>
      </g>
      <g transform="translate(28.786796564403577,71.21320343559643)">
        <g transform="rotate(135)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.625">
            <animateTransform attributeName="transform" type="scale" begin="-0.5s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.5s" />
          </circle>
        </g>
      </g>
      <g transform="translate(20,50.00000000000001)">
        <g transform="rotate(180)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.5">
            <animateTransform attributeName="transform" type="scale" begin="-0.375s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.375s" />
          </circle>
        </g>
      </g>
      <g transform="translate(28.78679656440357,28.786796564403577)">
        <g transform="rotate(225)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.375">
            <animateTransform attributeName="transform" type="scale" begin="-0.25s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.25s" />
          </circle>
        </g>
      </g>
      <g transform="translate(49.99999999999999,20)">
        <g transform="rotate(270)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.25">
            <animateTransform attributeName="transform" type="scale" begin="-0.125s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="-0.125s" />
          </circle>
        </g>
      </g>
      <g transform="translate(71.21320343559643,28.78679656440357)">
        <g transform="rotate(315)">
          <circle cx="0" cy="0" r="6" fill="#ff727d" fill-opacity="0.125">
            <animateTransform attributeName="transform" type="scale" begin="0s" values="1.5 1.5;1 1" keyTimes="0;1"
              dur="1s" repeatCount="indefinite" />
            <animate attributeName="fill-opacity" keyTimes="0;1" dur="1s" repeatCount="indefinite" values="1;0"
              begin="0s" />
          </circle>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
import { getSearchHots } from "@/apis";
var _ = require("lodash");
export default {
  props: {
    playing: Boolean,
    songId: [String, Number],
    o: Array
  },
  data: function () {
    return {
      value: "",
      hots: [],
      suggests: [],
      searchRes: null,
      loading: false,
      // history:JSON,parse(window.localStorage.getItem("history")) || [],
      history: JSON.parse(window.localStorage.getItem("history")) || []
    };
  },
  created() {
    this.loading = true;

    getSearchHots().then(res => {
      this.loading = false;
      this.hots = res.data.result.hots;
    });
    this.debouncedGetSearchSuggests = _.debounce(this.getSearchSuggests, 800);
  },
  methods: {
    getSearchSuggests: function (keywords) {
      this.loading = true;
      this.axios
        .get("https://apis.netstart.cn/music/search/suggest", {
          params: { keywords, type: "mobile" }
        })
        .then(res => {
          this.loading = false;

          //如果修改的过程很快 从有值 快速删除到空
          //过程中如果出现一个Ajax很慢 比删完还慢
          //删除完成后 Ajax才有结果
          this.value
            ? (this.suggests = res.data.result.allMatch)
            : (this.suggests = []);
        });
    },
    getSearchResult: function (keywords) {
      this.loading = true;
      this.axios
        .get("https://apis.netstart.cn/music/cloudsearch", {
          params: { keywords, limit: 10, offset: 0 }
        })
        .then(res => {
          this.loading = false;
          this.searchRes = res.data.result;
          // console.log(this.searchRes, res.data.result);
        });
      this.history = [...new Set([keywords, ...this.history])];
    },
  },
  watch: {
    value: function (n) {
      if (n) {
        //如果存在就发送ajax
        // getSearchSuggests(n).then((res) => {});
        this.debouncedGetSearchSuggests(n);
      } else {
        this.suggests = [];
      }
    },
    history: function (newHistory) {
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes playingrunning {
  from {
    transform: rotateX(15deg);
  }

  to {
    transform: rotateX(60deg);
  }
}

.search {
  margin-top: 50rem;
  position: relative;

  .loading {
    width: 20%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  .search-big {
    padding: 15rem;
    border-bottom: 1rem solid rgba(0, 0, 0, 0.1);

    .search-input {
      // text-align: center;
      position: relative;
      height: 30rem;
      display: flex;
      justify-content: center;

      // margin: 15rem 0;
      .input-icon {
        width: 355rem;
        // background-color: gray;
        height: 30rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-radius: 30rem;
        background-color: rgba(0, 0, 0, 0.1);
        padding: 10rem;

        .search-icon {
          color: #c9c9c9;
        }

        .search-icon-two {
          color: gray;
        }
      }

      input {
        // background-color: rgba(0,0,0,0.1);
        background-color: #e5e5e5;
        width: 295rem;
        height: 28rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: transparent;
        outline: none;

        &::-webkit-input-placeholder {
          color: #c9c9c9;
        }
      }
    }
  }

  .hots-style {
    padding: 15rem 10rem 0;

    .hots {
      // display: flex;
      // flex-wrap: wrap;
      margin: 10px 0 7px;

      li {
        border: 1rem solid rgb(217, 217, 217);
        display: inline-block;
        height: 32rem;
        margin-right: 8rem;
        margin-bottom: 8rem;
        padding: 0 14rem;
        font-size: 14rem;
        line-height: 32rem;
        border-radius: 32rem;
        color: #333;
        // margin: 8rem;
      }
    }
  }

  .history-style {
    .history {
      li {
        display: flex;
        align-items: center;

        .history-two {
          // background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
          // background-size: 167rem 97rem;
          // background-position: -24rem 0;
          width: 15rem;
          height: 15rem;
          margin: 5rem;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljYWNhIiBkPSJNMTUgMzBDNi43MTYgMzAgMCAyMy4yODQgMCAxNVM2LjcxNiAwIDE1IDBzMTUgNi43MTYgMTUgMTUtNi43MTYgMTUtMTUgMTVtMC0yOEM3LjgyIDIgMiA3LjgyIDIgMTVzNS44MiAxMyAxMyAxMyAxMy01LjgyIDEzLTEzUzIyLjE4IDIgMTUgMm03IDE2aC04YTEgMSAwIDAgMS0xLTFWN2ExIDEgMCAxIDEgMiAwdjloN2ExIDEgMCAxIDEgMCAyIi8+PC9zdmc+");
          display: inline-block;
          vertical-align: middle;
          background-position: 0 0;
          background-size: contain;
          background-repeat: no-repeat;
        }

        .search-text {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          height: 40rem;
          border-bottom: 1rem solid rgba(0, 0, 0, 0.1);

          h5 {}

          .history-one {
            margin-right: 20rem;
            color: #999899;
          }
        }
      }
    }
  }

  .suggests {
    .suggests-title {
      height: 50rem;
      margin-left: 10rem;
      padding-right: 10rem;
      font-size: 15rem;
      line-height: 50rem;
      color: #507daf;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    li {
      display: flex;
      align-items: center;
      height: 45rem;
      padding-left: 10rem;

      i {
        width: 15rem;
        height: 15rem;
        color: rgba(0, 0, 0, 0.3);
      }

      h5 {
        margin-left: 5rem;
        border-bottom: 1rem solid rgba(0, 0, 0, 0.1);
        width: 100%;
        padding-right: 10rem;
        font-size: 15rem;
        line-height: 45rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }
    }
  }

  .search-search {
    li {
      border-bottom: 1rem solid rgba(0, 0, 0, 0.101);
      padding: 8rem 0;
      margin-left: 10rem;
      display: flex;
      justify-content: space-between;

      .search-text {
        color: #888;
        width: 320rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;

        h5 {
          font-size: 17rem;
          line-height: 24rem;
          color: #333;
        }

        i {
          padding-left: 15rem;
          background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
          background-repeat: no-repeat;
          background-position: 0rem 3rem;
          background-size: 160rem 90rem;
        }

        .search-to {
          display: inline-block;
        }
      }

      .play-icon {
        width: 22rem;
        height: 22rem;
        display: inline-block;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
        background-size: 167rem 97rem;
        background-position: -24rem 0;
        margin: 10rem;

        &.active {
          background-image: none;
          display: flex;
          justify-content: space-around;

          span {
            width: 11%;
            height: 100%;
            background: red;
            animation: playingrunning 0.8s infinite alternate;
            animation-play-state: paused;
            transform-origin: bottom;

            &:nth-child(1) {
              animation-delay: 0s;
            }

            &:nth-child(2) {
              animation-delay: -0.2s;
            }

            &:nth-child(3) {
              animation-delay: -0.4s;
            }

            &:nth-child(4) {
              animation-delay: -0.6s;
            }
          }

          &.playing {
            span {
              animation-play-state: running;
            }
          }
        }
      }
    }
  }
}
</style>