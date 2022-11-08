   <template>
  <li>
    <div
      class="song-item"
      v-for="song in newsongs"
      :key="song.id"
      :class="{active: song.id === songId}"
      @click="$emit('update-song', song); $emit('update-song-list',newsongs)"
    >
      <div class="song-text">
        <h5>{{ song.name }}</h5>
        <i v-if="song.song.copyright == 0"></i>
        <p v-for=" songers in song.song.artists" :key="songers.id">{{ songers.name }}&nbsp;</p>
        <span>- {{ song.song.album.name }}</span>
      </div>
      <div v-if="song.id !== songId" class="newsong-play"></div>
      <div v-else class="newsong-play active" :class="{ playing: playing }">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </li>
</template>
   
   <script>
export default {
  props: {
    newsongs: Array,
    songId: [String, Number],
    playing: Boolean
  },
  methods: {}
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
.song-item {
  // margin: 0 auto;
  border-bottom: 1rem solid rgba(0, 0, 0, 0.1);
  padding: 8rem 0;
  margin-left: 10rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  .song-text {
    width: 320rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
          color: #888;
    i {
      // width: 20rem;
      // margin: 4rem 0;
      padding-left: 15rem;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-repeat: no-repeat;
      background-position: 0rem 3rem;
      background-size: 160rem 90rem;
    }
    h5 {
      font-size: 17rem;
      line-height: 24rem;
      color: #333;
    }
    p {
      display: inline-block;

    }
  }
  .newsong-play {
    background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
    background-position: -24px 0;
    background-size: 166px 97px;
    width: 22rem;
    height: 22rem;
    position: absolute;
    right: 10rem;
    top: 50%;
    transform: translateY(-50%);
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
</style>