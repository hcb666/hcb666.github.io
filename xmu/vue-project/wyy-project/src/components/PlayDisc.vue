<template>
  <div class="playdisc">
    <!-- <img  :src= alt=""> -->
    <div class="this" :class="{ playing: playing }">
      <img src="https://s3.music.126.net/mobile-new/img/needle-ab.png?4b81da043356110081e5ccaed2e6f2ad=" alt="">
    </div>
    <div class="body" :class="{ playing: playing }">
      <div class="imgs">
        <img :src="
          song ? `${showIm}?imageView=1&type=webp&thumbnail=240x0` : ''
        " alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    song: Object,
    playing: Boolean
  },
  computed: {
    showIm() {
      return this.song.al ? this.song.al.picUrl : this.song.picUrl;
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes discrotate {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.playdisc {
  width: 300rem;
  height: 300rem;
  margin: 30rem auto;
  margin-top: 100rem;
  position: relative;

  .this {

    width: 100rem;
    height: 150rem;
    position: absolute;
    top: -60rem;
    left: calc(50% - 12rem);
    z-index: 999;
    transform-origin: 15rem 15rem;
    transition: all .3s;
    transform: rotate(320deg);

    &.playing {
      transform: rotate(355deg);
      // animation-play-state: running;
    }
  }
  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    // border: 5rem solid rgba(246, 243, 243, 0.3);
    background-image: url("https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a244701ee85fecb5d4f6b5bd57.png?imageView=&quality=75&thumbnail=200y200");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center;
    // background-color: rgba(21, 20, 20, 0.97);
    border-radius: 50%;
    animation: discrotate 15s linear infinite;
    animation-play-state: paused;

    &.playing {
      animation-play-state: running;
    }

    .imgs {
      // animation-play-state: paused;
      width: 190rem;
      height: 190rem;
      border-radius: 50%;
      background-color: #fff;

      img {
        border-radius: 50%;
      }
    }


  }
}
</style>