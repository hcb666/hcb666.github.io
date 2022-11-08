<template>
  <div class="hot">
    <div class="hot-header">
      <div class="hot-logo"></div>
      <p>更新日期：{{ value }}</p>
    </div>
    <ul>
      <HotSong
        v-for="(hotsong,index) in hotsongs"
        :key="hotsong.id"
        :hotsong="hotsong"
        :hotsongs="hotsongs"
        :songId="songId"
        :playing="playing"
        :index="index"
        @update-hotsong="$emit('update-hotsong',$event)"
        @update-hotsong-list="$emit('update-hotsong-list',$event)"
      />
    </ul>
    <div class="hot-botton">
      <span>查看完整榜单&nbsp;&nbsp;&gt;</span>
    </div>
  </div>
</template>

<script>
import HotSong from "@/components/HotSong.vue";

export default {
  components: {
    HotSong
  },
  props: { songId: [String, Number],playing:Boolean },
  data() {
    return {
      value: this.getDate(),
      hotsongs: []
    };
  },
  created() {
    this.axios
      .get("https://apis.netstart.cn/music/playlist/detail?id=3778678")
      .then(res => {
        // this.newsongs = n.data.result;
        this.hotsongs = res.data.playlist.tracks.slice(0, 20);

        console.log(this.hotsongs);
      });
  },
  methods: {
    getDate() {
      const nowDate = new Date();
      const date = {
        month: nowDate.getMonth() + 1,
        date: nowDate.getDate()
      };
      const newmonth = date.month >= 10 ? date.month : "0" + date.month;
      const day = date.date >= 10 ? date.date : "0" + date.date;
      return newmonth + "月" + day + "日";
    }
  }
};
</script>


<style lang="less" scoped>
.hot {
  margin-top: 40rem;

  .hot-header {
    padding: 25rem;
    background-image: url("https://s3.music.126.net/mobile-new/img/hot_music_bg_2x.jpg?f01a252389c26bcf016816242eaa6aee=");
    background-size: contain;
    .hot-logo {
      width: 142px;
      height: 67px;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-size: 166px 97px;
      background-position: -23rem -30rem;
    }
    p {
      color: white;
      margin: 5rem 0;
    }
  }
  .hot-botton {
    padding: 15rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 16rem;
      color: rgb(158, 158, 158);
    }
  }
}
</style>