<template>
  <div class="playbar">
    <div class="playbar-img">
      <img :class="{ playing: playing }" :src="song ? `${showIm}?imageView=1&type=webp&thumbnail=36x0` : ''" alt />
    </div>
    <div class="geming">
      <h3>{{ song?.name }}</h3>
      <p>{{ currentTime| formatSeconds }} / {{duration| formatSeconds }}</p>
    </div>

    <div class="playbutton">
      <i class="fa fa-play" v-if="!playing" @click.stop="$emit('song-play')"></i>
      <i class="fa fa-pause" v-else @click.stop="$emit('song-pause')"></i>
      <canvas class="canvas" ref="canvas" width="50" height="50"></canvas>
    </div>
    <i class="fa fa-list list-icon" @click.stop="$emit('toggle-showPlayList')"></i>
    <!-- <button v-if="!playing" @click.stop="$emit('song-play')"></button> -->
    <!-- <button v-else @click.stop="$emit('song-pause')"></button> -->
  </div>
</template>

<script>
export default {
  props: {
    song: Object,
    playing: Boolean,
    duration: Number,
    currentTime: Number
  },

  computed: {
    persontage: function () {
      return this.currentTime / this.duration;
    },
    showIm() {
      return this.song.al ? this.song?.al?.picUrl : this.song?.picUrl;
    },
  },
  watch: {
    persontage: function (n) {
      var canvas = this.$refs.canvas;
      var context = canvas.getContext("2d");

      context.clearRect(0, 0, 50, 50);

      context.beginPath();
      context.arc(25, 25, 24, -0.5 * Math.PI, Math.PI * (2 * n - 0.5));
      context.stroke();
    }
  },
  //vue过滤器filters,跟钩子函数平级
  filters: {
    //创建函数名formatSeconds
    formatSeconds(value) {
      let result = parseInt(value);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      let res = "";
      if (m !== "00") {
        res += `${m}:`;
        res += `${s}`;
        return res;
      } else {
        res += `00:`;

        res += `${s}`;
        return res;
      }
    }
  }
};
</script>

<style lang="less" scoped>
@keyframes rotate {
  form {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

@keyframes gmgundong {
  to {
    transform: translateX(360deg);
  }
}

.playbar {
  width: 100%;
  height: 60rem;
  // background: rgba(29, 29, 31, 0.72);
  background-color: #fff;
  backdrop-filter: saturate(180%) blur(20px);
  position: fixed;
  bottom: 0;
  left: 0;
  border-top: 1rem solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10rem;

  .playbar-img {
    background-image: url("https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200");
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: -30rem;
    width: 50rem;
    height: 50rem;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      border-radius: 50%;
      animation: rotate 8s linear infinite;
      animation-play-state: paused;

      &.playing {
        animation-play-state: running;
      }
    }
  }

  .geming {
    margin-left: -30rem;
    width: 160rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: normal;
    color: gray;
    text-align: center;

    h3 {
      font-size: 16rem;
      font-weight: 500;
      color: black;
      animation: gmgundong 5s infinite linear;
    }
  }

  .playbutton {
    width: 50rem;
    height: 50rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .canvas {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
    }

    i {
      font-size: 24rem;

      // // position: absolute;
      // top: calc(50% - 11rem);
      // left: calc(50% - 9rem);
    }
  }

  .list-icon {
    font-size: 24rem;
  }
}
</style>