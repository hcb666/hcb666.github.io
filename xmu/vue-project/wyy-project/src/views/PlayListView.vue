<template>
  <div class="playlist">
   <div class="back">
    <svg  @click="$router.push({ path: './'})" t="1664458352773" fill="white" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1647" width="25" height="25"><path d="M538.288 198.624l-11.312-11.312a16 16 0 0 0-22.64 0L187.312 504.336a16 16 0 0 0 0 22.64L504.336 844a16 16 0 0 0 22.64 0l11.312-11.312a16 16 0 0 0 0-22.624l-294.4-294.4 294.4-294.4a16 16 0 0 0 0-22.64z" p-id="1648"></path></svg>
   </div>
    <div class="playlist-header">
      <div
        class="header-img"
        :style=" playlist && {backgroundImage:'url(' + playlist?.coverImgUrl + ')'}"
      ></div>
      <div class="playlist-left">
        <p>歌单</p>
        <img

          :src="playlist ? `${playlist?.coverImgUrl}?imageView=1&type=webp&thumbnail=126x0` : ''"
          alt
        />
        <span>{{ playlist?.playCount | moneyFormat}}</span>
      </div>
      <!-- 收听次数playCount -->
      <div class="header-landlord">
        <p>{{ playlist?.name }}</p>
        <div class="people">
          <img
            :src="playlist ? `${playlist?.creator?.avatarUrl}?imageView=1&type=webp&thumbnail=30x0` : ''"
            alt
          />
          <h3>{{ playlist?.creator?.nickname }}</h3>
        </div>
      </div>
    </div>
    <!-- <h3>playlist</h3> -->
    <div class="allsongs-title">
      <h3>歌曲列表</h3>
    </div>
    <div class="allsongs">
      <ul>
        <AllPlayListSongs
          v-for="(allsongs, index) in playlisallsongs"
          :key="allsongs.id"
          :allsongs="allsongs"
          :playing="playing"
          :playlisallsongs="playlisallsongs"
          :index="index"
          :songId="songId"
          @update-playlistsong="$emit('update-playlistsong',$event)"
          @update-playlistsong-list="$emit('update-playlistsong-list',$event)"
        />
      </ul>
      <!-- <div class="allsongs-botton">
        <h3>查看更多歌曲 ></h3>
      </div> -->
    </div>
    <div class="hotcomment-title">
      <h3>精彩评论</h3>
    </div>
    <ul>
      <HotComments
        v-for="hotcomment in playlistcomments"
        :key="hotcomment.commentId"
        :hotcomment="hotcomment"
      />
    </ul>
  </div>
</template>

<script>
import AllPlayListSongs from "@/components/AllPlayListSongs.vue";
import HotComments from "@/components/HotComments.vue";

export default {
  components: {
    AllPlayListSongs,
    HotComments
  },
  props: {
     playing: Boolean,
       songId: [String, Number],
  },
  data: function() {
    return {
      playlistcomments: [],
      playlist: null,
      playlisallsongs: null
    };
  },
  methods: {
    getPlayList: function(id) {
      this.axios
        .get("https://apis.netstart.cn/music/playlist/detail", {
          params: { id }
        })
        .then(res => {
          this.playlist = res.data.playlist;
          this.playlisallsongs = this.playlist.tracks.slice(0,20)
        });
    },
    PlayListComment: function(id) {
      this.axios
        .get("https://apis.netstart.cn/music/comment/playlist", {
          params: { id }
        })
        .then(res => {
          this.playlistcomments = res.data.hotComments;
          console.log(this.playlistcomments);
        });
    }
  },

  created: function() {
    // console.log(this.$route);
    this.getPlayList(this.$route.query.id);
    this.PlayListComment(this.$route.query.id);
  },
  //确保路由更新的foo？id
  beforeRouteUpdate(to, from, next) {
    //在当前路由改变，但是该组件恢复用时调用
    //对于一个带有动态参数的路径 /foo/:id,在/foo/1和/foo/2之间跳转的时候，由于会渲染同样的foo组件
    //因此实例会被复用。而这个钩子就会在这个境况下被调用，可以访问组件实例'this'
    // console.log(to.query.id);
    this.getPlayList(to.query.id);
    this.PlayListComment(this.$route.query.id);
    next();
  },
  filters: {
    //取截单元,单位
    moneyFormat: function(arg) {
      if (arg?.toString().length >= 13) {
        // return arg/1000000000000+"万亿"
        const moneys = arg / 1000000000000;
        const realVal = parseFloat(moneys).toFixed(2);
        return realVal + "万亿";
      } else if (arg?.toString().length >= 9) {
        const moneys = arg / 100000000;
        const realVal = parseFloat(moneys).toFixed(2);
        return realVal + "亿";
      } else if (arg?.toString().length >= 4) {
        const moneys = arg / 10000;
        const realVal = parseFloat(moneys).toFixed(1);
        return realVal + "万";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.playlist {
  position: relative;
  .back{
    position: absolute;
    top: 3rem;
    left: 5rem;
    z-index: 9;
  }
  .allsongs {
    .allsongs-botton {
      display: flex;
      justify-content: center;
      padding: 10rem 0;

      h3 {
        color: rgb(137, 137, 137);
      }
    }
  }

  .playlist-header {
    position: relative;
    overflow: hidden;
    display: flex;
    padding: 40rem 5rem 20rem;

    .header-img {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 50%;
      filter: blur(30rem);
      position: absolute;
      top: 0;
      left: 0;
      z-index: -9;
      transform: scale(1.5);
    }

    .playlist-left {
      width: 126rem;
      position: relative;

      p {
        position: absolute;
        z-index: 3;
        top: 10rem;
        left: 0;
        padding: 0 8rem;
        height: 17rem;
        color: #fff;
        font-size: 9rem;
        text-align: center;
        line-height: 17rem;
        background-color: rgba(217, 48, 48, 0.8);
        border-top-right-radius: 17rem;
        border-bottom-right-radius: 17rem;
      }

      // display: block;
      img {
        display: inline-block;
      }

      span {
        position: absolute;
        right: 5rem;
        top: 3rem;
        color: white;
        padding-left: 13rem;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+");
        background-position: 0;
        background-repeat: no-repeat;
        background-size: 11rem 10rem;
      }
    }

    .header-landlord {
      padding: 3rem 15rem;
      width: 208rem;

      .people {
        display: flex;
        align-items: center;

        margin-top: 5rem;

        img {
          border-radius: 50%;
        }

        h3 {
          margin-left: 3rem;
          color: rgb(226, 226, 226);
        }
      }

      p {
        padding-top: 1rem;
        color: #fefefe;
        height: 42rem;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 14rem;
        // white-space: nowrap;
        word-break: normal;
        margin-bottom: 10rem;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: normal;
      }
    }
  }

  .allsongs-title {
    h3 {
      height: 23rem;
      line-height: 23rem;
      padding: 0 5rem;
      font-size: 12rem;
      color: #666;
      background-color: #eeeff0;
    }
  }

  .hotcomment-title {
    h3 {
      height: 23rem;
      line-height: 23rem;
      padding: 0 5rem;
      font-size: 12rem;
      color: #666;
      background-color: #eeeff0;
    }
  }
}
</style>