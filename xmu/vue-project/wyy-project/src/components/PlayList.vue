<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="top-left">
        <h5>正在播放</h5>
        <p>({{songlist?.length}})</p>
      </div>
      <span class="clear" @click.stop="$emit('toggle-showPlayList')"><svg t="1665652487675"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2559" width="24" height="24">
          <path
            d="M513.1 139.1c-206.7 0-374.2 167.5-374.2 374s167.6 374 374.2 374c206.7 0 374.2-167.5 374.2-374s-167.5-374-374.2-374z m0 689c-173.8 0-315.2-141.3-315.2-315s141.4-315 315.2-315c173.8 0 315.2 141.3 315.2 315s-141.4 315-315.2 315z"
            fill="#cdcdcd" p-id="2560"></path>
          <path
            d="M666 375.8l-13.9-13.9c-3.8-3.8-8.9-5.8-13.9-5.8s-10.1 1.9-13.9 5.8L512.8 473.3 401.5 361.9c-3.9-3.8-8.9-5.8-13.9-5.8s-10.1 1.9-13.9 5.8l-13.9 13.9c-7.7 7.7-7.7 20.2 0 27.9l111.4 111.4-111.5 111.4c-7.7 7.7-7.7 20.2 0 27.9l13.9 13.9c3.8 3.8 8.9 5.8 13.9 5.8s10.1-1.9 13.9-5.8l111.4-111.4 111.4 111.4c3.9 3.8 8.9 5.8 13.9 5.8s10.1-1.9 13.9-5.8l13.9-13.9c7.7-7.7 7.7-20.2 0-27.9L554.6 515.1 666 403.7c7.7-7.7 7.7-20.2 0-27.9z"
            fill="#cdcdcd" p-id="2561"></path>
        </svg></span>
    </div>
    <ul class="card">
      <li v-for="song in songlist" :key="song?.id" :style="{color: song?.id ===songId ? 'red' : ''}"
        @click="$emit('update-song',song)">
        <div class="playlistcard">
          <p>
            {{song?.name}}
            <span>- {{song.song?.artists[0] ? song.song.artists[0].name : song.ar[0].name}}</span>
          </p>
          <!--   -->
          <svg t="1664363657256" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
            @click="$emit('update-songList',song)" p-id="2553" width="20" height="20" fill="gray">
            <path
              d="M850.538343 895.516744c-11.494799 0-22.988574-4.386914-31.763424-13.161764L141.103692 204.669426c-17.548678-17.534352-17.548678-45.992497 0-63.525825 17.548678-17.548678 45.977147-17.548678 63.525825 0l677.671227 677.685553c17.548678 17.534352 17.548678 45.992497 0 63.525825C873.526917 891.128807 862.032118 895.516744 850.538343 895.516744z"
              p-id="2554" />
            <path
              d="M172.867116 895.516744c-11.494799 0-22.988574-4.386914-31.763424-13.161764-17.548678-17.534352-17.548678-45.992497 0-63.525825l677.671227-677.685553c17.548678-17.548678 45.977147-17.548678 63.525825 0 17.548678 17.534352 17.548678 45.992497 0 63.525825L204.629517 882.354979C195.85569 891.128807 184.360891 895.516744 172.867116 895.516744z"
              p-id="2555" />
          </svg>
        </div>
      </li>
    </ul>
    <div class="mask" @click="$emit('toggle-showPlayList')"></div>
  </div>
</template>
 
<script>
export default {
  props: {
    songlist: [Object, Array],
    songId: [Number, String]
  },
  data: function () {
    return {


    }
  }
};
</script>
 
<style lang="less" scoped>
.playlist {
  width: 100%;
  height: 60vh;
  position: fixed;
  bottom: 60rem;
  left: 0;
  z-index: 999;
  padding: 15rem;

  .playlist-top {
    width: 345rem;
    height: 40rem;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: absolute;
    top: 14rem;
    left: 0rem;
    right: 0;
    z-index: 99;
    border-radius: 15rem 15rem 0 0;
    border-bottom: 1rem solid rgb(230, 230, 230);

    span {
      margin-right: 10rem;
      display: flex;
      align-items: center;
    }

    .top-left {
      margin-left: 15rem;
      display: flex;
      align-items: baseline;
      h5 {
        font-size: 16rem;
      }

      p {
        transform: scale(0.7);
      }
    }
  }

  span.clear {
    position: relative;
    z-index: 60;
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vh;
    height: 100vh;
    background-color: #3c3c3cab;
    z-index: 10;
  }

  .card {
    // background-color: rgb(118, 118, 118);
    max-height: 100%;
    overflow: hidden;
    background-color: #fff;
    box-shadow: 0 0 3rem 0 black;
    min-height: calc(60vh - 30rem);
    border-radius: 15rem;
    padding: 15rem;
    overflow-y: auto;
    position: relative;
    z-index: 50;
    padding-top: 40rem;

    .playlistcard {
      display: flex;
      justify-content: space-between;
      align-items: center;

      margin-bottom: 10rem;

      p {
        width: 280rem;
        padding: 15rem 0;
        font-size: 15rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        word-break: normal;

        span {
          color: rgb(172, 172, 172);
          font-size: 10rem;
        }
      }
    }
  }
}
</style>