 <template>
  <li class="hotsong-card"  :class="{active: hotsong?.id === songId}">
    <!-- <h1>{{ numberIndex }}</h1> -->
    <h6>{{ String(index + 1).padStart(2, "0") }}</h6>
    <div class="right-card" @click="$emit('update-hotsong',hotsong);$emit('update-hotsong-list',hotsongs)">
      <div class="hotsong-card-text">
        <h5>{{ hotsong.name }}</h5>
        <i v-if="hotsong.copyright == 0"></i>
        <p v-for="songers in hotsong.ar" :key="songers.id">{{ songers?.name }} &nbsp;</p>
        <span>- {{ hotsong.al.name }}</span>
        <p></p>
      </div>
       <div v-if="hotsong?.id !== songId" class="hotsong-play"></div>
      <div v-else class="hotsong-play active" :class="{ playing: playing }">
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
    hotsong: Object,
    index: Number,
    hotsongs: Array,
        songId: [String, Number],
        playing: Boolean
  }
  // computed: {
  //   numberIndex() {
  //     return String(this.index).length == 1
  //       ? "0" + String(this.index + 1)
  //       : String(this.index + 1);
  //   },
  // },
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
.hotsong-card {
  padding: 8rem 0;
  display: flex;
  justify-content: space-around;
  h6 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 30px;
    font-size: 17px;
    color: #999;
    margin-left: -10px;
    border: none;
  }
  &:nth-child(1) h6 {
    color: #df3436;
  }
  &:nth-child(2) h6 {
    color: #df3436;
  }
  &:nth-child(3) h6 {
    color: #df3436;
  }
  .right-card {
    display: flex;
    align-items: center;
    border-bottom: 1rem solid rgba(0, 0, 0, 0.1);
    .hotsong-card-text {
      //   margin-left: 10rem;
      width: 280rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
        color: #888;
      h5 {
        font-size: 17rem;
        line-height: 24rem;
        color: #333;
      }
      i {
        width: 20rem;
        // margin: 4rem 0;
        padding-left: 15rem;
        background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
        background-repeat: no-repeat;
        background-position: 0rem 3rem;
        background-size: 160rem 90rem;
      }
      p {
        line-height: 20rem;
        padding-bottom: 5rem;
        display: inline-block;

      }
    }
    .hotsong-play {
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
</style>