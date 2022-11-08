<template>
  <div class="playpage">
    <div class="playpage-img" :style=" song&&{backgroundImage:'url(' + showIm + ')'}"></div>
    <div class="mask"></div>
    <header>
      <svg @click="$parent.showPlayPage = false" t="1664280909703" class="header-icon" viewBox="0 0 1026 1024"
        version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2686" fill="aliceblue">
        <path
          d="M857.088 224.256q28.672-28.672 69.12-28.672t69.12 28.672q29.696 28.672 29.696 68.608t-29.696 68.608l-382.976 380.928q-12.288 14.336-30.72 19.968t-38.912 4.608-40.448-8.704-34.304-22.016l-376.832-374.784q-29.696-28.672-29.696-68.608t29.696-68.608q14.336-14.336 32.256-21.504t36.864-7.168 37.376 7.168 32.768 21.504l313.344 309.248z"
          p-id="2687" />
      </svg>
      <div class="song-name">
        <h1>{{ song?.name }}</h1>
      </div>
      <div class="songers-name">
        <span> {{song.song?.artists[0] ? song.song.artists[0].name : song.ar[0].name}}</span>

      </div>
    </header>

    <section>
      <PlayDisc v-if="showDisc" @click.native="showDisc = false" :song="song" :playing="playing" />
      <PlayLyric v-else @click.native="showDisc = true" :song="song" :currentTime="currentTime" />
    </section>

    <footer>
      <div class="footer-top">
        <p style="margin: 0 8rem; width: 30rem;">{{ currentTime | formatSeconds }} </P>
        <div class="good">
          <div class="jindutiao">
            <div class="jindu">
              <div class="mask" :style="{ width: `${( tmpCurrentTime / duration).toFixed(2) * 100}%` }"></div>
            </div>
            <div class="radio" :style="{ left: `${(tmpCurrentTime / duration).toFixed(2) * 100}%` }"></div>

            <input type="range" min="0" :max="duration" :value="tmpCurrentTime" @input="draging=true"
              @change="draging=false;$emit('update-time',$event.target.value)" />
          </div>
        </div>
        <p style="margin: 0 8rem ; width: 30rem;"> {{duration | formatSeconds }}</p>
      </div>
      <div class="footerbutton">
        <!-- <button @click="$emit('change-model')">{{model}}</button> -->
        <svg @click="$emit('change-model')" v-show="model === '随'" t="1664450656973" class="icon"
          viewBox="0 0 1063 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2571" width="20" height="20">
          <path
            d="M911.478154 682.653538a38.990769 38.990769 0 0 0-30.326154-13.115076c-21.897846 0.827077-38.912 19.298462-38.084923 41.196307 0.472615 11.933538 6.380308 22.055385 14.966154 28.987077l47.182769 47.222154a289.201231 289.201231 0 0 1-139.264-61.794462L331.697231 257.063385A369.388308 369.388308 0 0 0 53.956923 131.150769a39.384615 39.384615 0 1 0 0 78.769231h0.039385c83.652923 0 163.249231 36.115692 219.214769 99.879385l433.624615 468.007384 8.27077 7.483077a369.664 369.664 0 0 0 194.048 81.762462l-52.539077 51.081846 0.984615 0.945231a39.069538 39.069538 0 0 0-17.604923 33.71323c0.866462 21.897846 19.298462 38.990769 41.156923 38.124308a38.912 38.912 0 0 0 29.971692-16.699077l0.393846 0.393846 148.48-144.226461-148.046769-148.204308-0.472615 0.472615z"
            p-id="2572"></path>
          <path
            d="M911.163077 30.759385a38.990769 38.990769 0 0 0-30.011077-16.699077 39.660308 39.660308 0 0 0-41.117538 38.124307 38.990769 38.990769 0 0 0 17.604923 33.673847l-0.984616 1.024 48.600616 47.261538a366.08 366.08 0 0 0-217.481847 106.259692l-128.551384 139.34277 0.196923 0.196923a38.990769 38.990769 0 0 0-10.633846 26.505846 39.384615 39.384615 0 0 0 39.384615 39.384615 38.990769 38.990769 0 0 0 28.750769-12.878769l0.196923 0.196923 126.582154-137.294769a287.665231 287.665231 0 0 1 166.675693-82.944l-52.224 52.302769a39.108923 39.108923 0 0 0-15.044923 29.026462c-0.866462 21.897846 16.147692 40.329846 38.045538 41.196307a38.990769 38.990769 0 0 0 30.326154-13.115077l0.472615 0.433231 148.046769-148.164923-148.48-144.226462-0.393846 0.393847zM415.783385 554.889846a38.872615 38.872615 0 0 0-28.672 12.760616l-0.196923-0.157539-133.750154 144.265846A289.201231 289.201231 0 0 1 53.956923 790.843077v0.472615c-0.866462-0.039385-1.575385-0.472615-2.441846-0.472615a39.384615 39.384615 0 1 0 0 78.769231c0.866462 0 1.575385-0.472615 2.441846-0.472616v0.472616c94.562462 0 184.516923-35.721846 255.094154-102.4l135.601231-146.156308-0.196923-0.157538a38.872615 38.872615 0 0 0 10.712615-26.624 39.384615 39.384615 0 0 0-39.384615-39.384616"
            p-id="2573"></path>
        </svg>
        <svg t="1664450753653" class="icon" v-show="model === '顺'" @click="$emit('change-model')"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3026" width="20" height="20">
          <path
            d="M106 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM457.3 85.5c-22.1 0-40 17.9-40 40v760.6c0 22.1 17.9 40 40 40s40-17.9 40-40V125.5c0-22.1-17.9-40-40-40zM955.1 661.4c-7.1-12.4-20.3-20-34.6-20h-72c0-0.8 0.1-1.5 0.1-2.3V125.5c0-22.1-17.9-40-40-40s-40 17.9-40 40v513.6c0 0.8 0 1.5 0.1 2.3h-87c-14.3 0-27.5 7.6-34.6 20-7.1 12.4-7.1 27.6 0 40l119.4 206.8c7.1 12.4 20.3 20 34.6 20s27.5-7.6 34.6-20l119.4-206.8c7.2-12.4 7.2-27.7 0-40z m-154 146.8L751 721.4h100.2l-50.1 86.8z"
            p-id="3027"></path>
        </svg>
        <svg t="1664450807539" class="icon" v-show="model ==='单'" viewBox="0 0 1024 1024" @click="$emit('change-model')"
          version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3377" width="20" height="20">
          <path
            d="M928 476.8c-19.2 0-32 12.8-32 32v86.4c0 108.8-86.4 198.4-198.4 198.4H201.6l41.6-38.4c6.4-6.4 12.8-16 12.8-25.6 0-19.2-16-35.2-35.2-35.2-9.6 0-22.4 3.2-28.8 9.6l-108.8 99.2c-16 12.8-12.8 35.2 0 48l108.8 96c6.4 6.4 19.2 12.8 28.8 12.8 19.2 0 35.2-12.8 38.4-32 0-12.8-6.4-22.4-16-28.8l-48-44.8h499.2c147.2 0 265.6-118.4 265.6-259.2v-86.4c0-19.2-12.8-32-32-32zM96 556.8c19.2 0 32-12.8 32-32v-89.6c0-112 89.6-201.6 198.4-204.8h496l-41.6 38.4c-6.4 6.4-12.8 16-12.8 25.6 0 19.2 16 35.2 35.2 35.2 9.6 0 22.4-3.2 28.8-9.6l105.6-99.2c16-12.8 12.8-35.2 0-48l-108.8-96c-6.4-6.4-19.2-12.8-28.8-12.8-19.2 0-35.2 12.8-38.4 32 0 12.8 6.4 22.4 16 28.8l48 44.8H329.6C182.4 169.6 64 288 64 438.4v86.4c0 19.2 12.8 32 32 32z"
            p-id="3378"></path>
          <path d="M544 672V352h-48L416 409.6l16 41.6 60.8-41.6V672z" p-id="3379"></path>
        </svg>
        <svg t="1664285611146" @click="$emit('change-song', 'prev')" fill="aliceblue" class="icon"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4999">
          <path
            d="M803.584 134.592c-18.176-10.048-39.936-10.112-58.112 0L192 443.008l0-282.88c0-17.664-14.336-32-32-32S128 142.464 128 160.128l0 344.896C127.744 507.2 127.104 509.248 127.104 511.488S127.744 515.84 128 518.016l0 346.112c0 17.664 14.336 32 32 32s32-14.336 32-32L192 579.968l553.408 308.352C754.56 893.44 764.48 896 774.528 896s19.968-2.56 29.056-7.616c18.176-10.112 28.992-28.224 28.992-48.576L832.576 183.104C832.576 162.88 821.76 144.768 803.584 134.592zM768.192 829.248 198.016 511.488 771.328 192 768.192 829.248z"
            p-id="5000" />
        </svg>
        <svg v-if="!playing" @click.stop="$emit('song-play')" fill="aliceblue" class="big-icon" t="1664286005966"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5979">
          <path
            d="M512 96C282.624 96 96 282.624 96 512s186.624 416 416 416 416-186.624 416-416S741.376 96 512 96z m0 768C317.92 864 160 706.08 160 512S317.92 160 512 160s352 157.92 352 352-157.92 352-352 352z"
            p-id="5980" />
          <path
            d="M466.816 324.96a32 32 0 0 0-50.816 25.888v339.776a32 32 0 0 0 50.816 25.856l233.6-169.888a32 32 0 0 0 0-51.776l-233.6-169.856z"
            p-id="5981" />
        </svg>
        <svg t="1664285302690" fill="aliceblue" v-else @click.stop="$emit('song-pause')" class="big-icon"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4439">
          <path
            d="M512 960C264.576 960 64 759.424 64 512S264.576 64 512 64s448 200.576 448 448-200.576 448-448 448z m0-64c212.064 0 384-171.936 384-384S724.064 128 512 128 128 299.936 128 512s171.936 384 384 384z m-128-543.936a31.968 31.968 0 1 1 64 0v319.872a31.968 31.968 0 1 1-64 0v-319.872z m192 0a31.968 31.968 0 1 1 64 0v319.872a31.968 31.968 0 1 1-64 0v-319.872z"
            p-id="4440" />
        </svg>
        <svg t="1664285064986" @click="$emit('change-song', 'next')" fill="aliceblue" class="icon"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3318">
          <path
            d="M832 160.128c0-17.664-14.336-32-32-32S768 142.464 768 160.128l0 282.88L214.592 134.592c-18.176-10.112-39.936-10.048-58.112 0C138.24 144.768 127.424 162.88 127.424 183.168l0 656.64c0 20.224 10.816 38.464 29.056 48.576C165.568 893.44 175.488 896 185.472 896s19.968-2.56 29.056-7.616L768 579.968l0 284.096c0 17.664 14.336 32 32 32s32-14.336 32-32L832 160.128zM191.808 829.248 188.672 192l573.312 319.488L191.808 829.248z"
            p-id="3319" />
        </svg>
        <svg t="1664284963545" @click.stop="$emit('toggle-showPlayList')" fill="aliceblue" class="icon"
          viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2551">
          <path
            d="M832 832a32 32 0 0 1 3.744 63.776L832 896H192a32 32 0 0 1-3.744-63.776L192 832h640z m0-304a32 32 0 0 1 3.744 63.776L832 592H192a32 32 0 0 1-3.744-63.776L192 528h640zM224.256 128.544a64 64 0 0 1 26.816 5.888L256 136.96l127.488 72.832a64 64 0 0 1 4.832 108.096l-4.8 3.04L256 393.824a64 64 0 0 1-95.52-50.016l-0.224-5.568V192.544a64 64 0 0 1 64-64z m0 64v145.696l127.488-72.864-127.488-72.832zM832 224a32 32 0 0 1 3.744 63.776L832 288H496a32 32 0 0 1-3.744-63.776L496 224H832z"
            p-id="2552" />
        </svg>
      </div>
    </footer>
  </div>
</template>

<script>
import PlayDisc from "@/components/PlayDisc.vue";
import PlayLyric from "@/components/PlayLyric.vue";
export default {
  components: {
    PlayDisc,
    PlayLyric,

  },
  props: {
    song: Object,
    playing: Boolean,
    duration: Number,
    currentTime: [],
    model: String,
    tmpcurrentTime: Number,
  },
  data: function () {
    return {
      showDisc: true,
      draging: false,
      tmpCurrentTime: this.currentTime,
      value: ''
    };
  },
  computed: {
    showIm() {
      return this.song.al ? this.song.al.picUrl : this.song.picUrl;
    }
  },
  watch: {
    currentTime: function (n) {
      if (!this.draging) {
        this.tmpCurrentTime = n;
      }
    }
  },
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
.playpage {
  width: 100%;
  height: 100vh;
  color: aliceblue;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;

  .playpage-img {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -999;
    background-size: cover;
    background-repeat: no-repeat;
    transform: scale(1.5);
    filter: blur(30rem);
  }

  .mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
    position: absolute;
    top: 0;
    left: 0;
    z-index: -99;
  }

  .big-icon {
    width: 40rem;
    height: 40rem;
  }

  .icon {
    width: 24rem;
    height: 24rem;
    fill: aliceblue;
  }

  header {

    // text-align: center;
    .header-icon {
      width: 30rem;
      height: 30rem;
      position: absolute;
      top: 5rem;
      left: 5rem;
    }

    .song-name {
      width: 200rem;
      margin: 5rem auto;
      display: flex;
      align-items: center;
      font-size: 20rem;
      justify-content: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      word-break: normal;
      text-align: center;

      h1 {
        width: 100%;
        margin: 0 auto;
      }
    }

    .songers-name {
      display: flex;
      justify-content: center;
    }
  }

  section {
    // flex-grow: 1;
    width: 100%;
  }

  footer {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;

    .footer-top {
      display: flex;
      justify-content: space-between;

      .good {
        margin-bottom: 20rem;
        position: relative;
        width: 280rem;
        height: 1rem;
        top: 50%;

        .jindutiao {
          width: 280rem;

          .jindu {
            height: 100%;
            background-color: white;
            position: absolute;
            top: 6rem;
            left: 0;
            right: 0;
            bottom: 0;
            margin: auto;
            z-index: -1;

            .mask {
              width: 0%;
              height: 100%;
              background-color: black;
            }
          }

          .radio {
            width: 5rem;
            position: absolute;
            top: calc(50% + 6rem);
            transform: translateY(-50%);
            left: 30rem;
            right: 30rem;
            border-radius: 50%;
            width: 8rem;
            height: 8rem;
            background-color: rgb(0, 0, 0);
          }

          input {
            width: 280rem;
            position: absolute;
            top: -4rem;
            left: 0;
            right: 0;
            margin: 0 auto;
            opacity: 0;
            display: block;
          }
        }

        p {
          width: 30rem;
          // margin: 0 2rem;
        }


      }
    }


    .footerbutton {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 30rem;

      button {
        width: 40rem;
        background-color: transparent;
        border: none;
        color: white;
      }

      svg {
        width: 40rem;
      }
    }
  }
}
</style>