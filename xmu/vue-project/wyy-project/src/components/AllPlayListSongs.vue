<template>
  <li>
    <h6>{{ String(index + 1).padStart(2, "0") }}</h6>
    <div class="songs-text"
      @click="$emit('update-playlistsong',allsongs);$emit('update-playlistsong-list', playlisallsongs)"
      :playing="playing">
      <div class="songs">
        <h5>{{ allsongs?.name }}</h5>
        <div class="songers">
          <p class="allsongers" v-for="songers in allsongs?.ar" :key="songers?.id">{{ songers?.name }} &nbsp;</p>
          <p class="album">--{{allsongs?.al?.name}}</p>
        </div>
      </div>
      <div v-if="allsongs?.id !== songId" class="allsongs-play"></div>
      <div v-else class="allsongs-play active" :class="{ playing: playing }">
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
    allsongs: Object,
    index: Number,
    playlisallsongs: Array,
    playing: Boolean,
    songId: [String, Number]
  },
  data: function () {
    return {
      songers: []
    };
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

li {
  h6 {
    padding: 5rem;
  }

  display: flex;
  align-items: center;

  .songs-text {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-left: 5rem;
    border-bottom: 1rem solid rgba(0, 0, 0, 0.1);
    padding: 5rem 0;

    .songs {
      h5 {
        font-size: 17rem;
        width: 300rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;
      }

      .songers {
        display: flex;
        // display: inline-block;
        line-height: 16rem;
        width: 300rem;

        // height: 20rem;
        .allsongers {
          // display: flex;
          font-size: 12px;
          color: #888;
          line-clamp: 1;
          overflow: hidden;
          // text-overflow: ellipsis;
          white-space: nowrap;
          // word-break: normal;
        }

        .album {
          margin-left: 5rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          word-break: normal;
        }
      }
    }

    .allsongs-play {
      width: 22rem;
      height: 22rem;
      display: inline-block;
      background-image: url("https://s3.music.126.net/mobile-new/img/index_icon_2x.png?5207a28c3767992ca4bb6d4887c74880=");
      background-size: 167rem 97rem;
      background-position: -24rem 0;
      margin: 10rem;
      padding-top: 10rem;

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