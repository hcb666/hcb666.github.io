

<template>

  <keep-alive>
    <div class="personal">
      <div class="topheader">
        <img class="background" :src="personal ? personal?.background : ''" alt="">
        <div class="header-personal">
          <div class="header-name">
            <img class="webimg" :src=" personal ? personal?.web_url : ''" alt="">
            <h3>{{personal?.user_name}}</h3>
          </div>
        </div>
      </div>
      <div class="my-totes">
        <div class="top">
          <h3>我的小记</h3>
          <h5>全部&nbsp;&gt;</h5>
        </div>
        <div class="newwant">
          <div class="newwant-ac">
            <div class="newwant-top">
              <img src="@/assets/images/diary_icon.png" alt="">
              <h5 class="newwant-text">制作小记</h5>
            </div>
            <p class="want">记录你此刻的想法</p>
          </div>
        </div>
      </div>
      <div class="my-collection">
        <h3>我的收藏</h3>
        <div class="four-card">
          <div class="image-text" @click="$router.push({path:'/myGraphic'})">
            <img src="@/assets/images/my-text.png" alt="">
            <h5>图文</h5>
          </div>
          <div class="article" @click="$router.push({path:'/myEssay'})">
            <img src="@/assets/images/my-article.png" alt="">
            <h5>文章</h5>
          </div>
          <div class="music" @click="$router.push({path:'/myMusic'})">
            <img src="@/assets/images/my-music.png" alt="">
            <h5>音乐</h5>
          </div>
          <div class="movies" @click="$router.push({path:'/myFilm'})">
            <img src="@/assets/images/my-Movies.png" alt="">
            <h5>影视</h5>
          </div>
          <div class="radio" @click="$router.push({path:'/myRadioStation'})">
            <img src="@/assets/images/radio.png" alt="">
            <h5>电台</h5>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="bottom-card">
          <div class="follow card">
            <svg t="1665479641729" class="card-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="22828" width="20" height="20">
              <path
                d="M977.547636 837.818182H826.274909v151.272727a34.909091 34.909091 0 1 1-69.818182 0V837.818182h-151.272727a34.909091 34.909091 0 1 1 0-69.818182H756.456727v-151.272727a34.909091 34.909091 0 0 1 69.818182 0V768h151.272727a34.909091 34.909091 0 0 1 0 69.818182zM500.456727 605.090909c-6.423273 7.121455-12.846545 0-23.272727 0-174.871273 0-395.426909 167.68-395.426909 366.289455a34.909091 34.909091 0 0 1-35.095273 34.699636 34.909091 34.909091 0 0 1-35.118545-34.699636c0-164.119273 137.099636-350.161455 330.402909-408.994909C249.530182 510.789818 197.911273 414.952727 197.911273 302.545455 197.911273 136.471273 332.474182 0 500.456727 0s302.545455 136.471273 302.545455 302.545455c0 165.189818-135.796364 301.102545-302.545455 302.545454z m0-535.272727c-129.024 0-232.727273 105.169455-232.727272 232.727273s103.703273 232.727273 232.727272 232.727272 232.727273-105.169455 232.727273-232.727272S629.480727 69.818182 500.456727 69.818182z"
                p-id="22829"></path>
            </svg>
            <div class="right">
              <h5>我的关注</h5>

              <div class="iconimg"><img src="@/assets/images/back.png" alt=""></div>
            </div>
          </div>
          <div class="song-sheet card">
            <svg t="1665479490146" class="card-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="21908" width="20" height="20">
              <path
                d="M512 0C229.216 0 0 229.216 0 512c0 282.768 229.216 512 512 512 282.752 0 512-229.232 512-512C1024 229.216 794.752 0 512 0zM512 992C246.896 992 32 777.088 32 512 32 246.896 246.896 32 512 32c265.056 0 480 214.896 480 480C992 777.088 777.056 992 512 992z"
                p-id="21909"></path>
              <path
                d="M821.152 518.112c0.432-1.008 0.832-1.984 1.024-3.056 0.224-1.072 0.24-2.096 0.224-3.152 0-0.96-0.016-1.872-0.192-2.816-0.224-1.2-0.656-2.272-1.136-3.392-0.24-0.544-0.256-1.136-0.56-1.664-0.16-0.256-0.4-0.4-0.56-0.64-0.656-0.992-1.488-1.824-2.336-2.672-0.704-0.672-1.344-1.344-2.128-1.872-0.32-0.208-0.48-0.528-0.816-0.704l-457.264-264c-0.288-0.16-0.608-0.16-0.896-0.304-0.976-0.48-2-0.736-3.056-1.024-1.04-0.272-2.032-0.56-3.088-0.624-0.336-0.016-0.608-0.192-0.96-0.192-0.688 0-1.296 0.32-1.968 0.4-1.104 0.128-2.144 0.288-3.184 0.64-0.992 0.336-1.84 0.816-2.736 1.328-0.88 0.496-1.712 0.992-2.496 1.68-0.848 0.72-1.488 1.568-2.16 2.448-0.4 0.528-0.976 0.896-1.328 1.488-0.176 0.304-0.16 0.624-0.32 0.928-0.464 0.944-0.72 1.968-1.008 3.008-0.288 1.056-0.576 2.064-0.64 3.136-0.016 0.336-0.192 0.608-0.192 0.944l0 528.032c0 0.336 0.176 0.608 0.192 0.928 0.064 1.072 0.352 2.112 0.64 3.168 0.288 1.04 0.528 2.048 0.992 2.992 0.16 0.304 0.144 0.624 0.32 0.928 0.336 0.592 0.912 0.96 1.328 1.504 0.672 0.88 1.328 1.712 2.16 2.448 0.784 0.672 1.632 1.184 2.528 1.68 0.88 0.512 1.712 0.992 2.688 1.312 1.072 0.368 2.144 0.528 3.264 0.656 0.656 0.096 1.232 0.384 1.904 0.384 0.336 0 0.608-0.176 0.928-0.192 1.072-0.064 2.096-0.352 3.168-0.64 1.04-0.288 2.048-0.528 2.992-0.992 0.304-0.16 0.64-0.144 0.928-0.32l457.248-264c0.32-0.192 0.48-0.48 0.784-0.688 0.848-0.56 1.552-1.28 2.288-2.016 0.8-0.784 1.584-1.552 2.176-2.464 0.192-0.272 0.464-0.416 0.64-0.72C820.88 519.392 820.912 518.72 821.152 518.112zM365.408 275.696 774.672 512 365.408 748.304 365.408 275.696z"
                p-id="21910"></path>
            </svg>
            <div class="right">
              <h5>歌单</h5>
              <div class="iconimg"><img src="@/assets/images/back.png" alt=""></div>
            </div>
          </div>
          <div class="contribution card">
            <svg t="1665479399921" class="card-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="21005" width="20" height="20">
              <path
                d="M964.48 459.632l-94.784-82.416V84.608c0-12.368-8.24-20.608-20.608-20.608h-661.44c-12.368 0-20.624 8.24-20.624 20.608v298.784l-94.784 76.24c-6.176 4.128-8.24 10.304-8.24 16.48V950.08c0 12.368 8.24 20.608 20.608 20.608h865.44c12.384 0 20.624-8.24 20.624-20.608V476.128c0-6.192-2.08-12.368-6.192-16.48z m-96.848-26.784l49.456 41.216-49.44 32.96v-74.176zM208.24 105.216h618.192v430.656l-212.256 146.304H420.48l-212.24-146.304V105.216zM167.04 436.96v72.112l-47.392-32.96 47.392-39.152z m-61.808 78.304l274.064 187.52-274.08 206.048V515.28zM146.432 929.44L420.48 723.392h191.648l276.112 206.064H146.432z m783.024-20.608L655.392 702.784l274.064-187.52v393.584zM744 414.288H290.672v41.232H744v-41.216z m0-103.008H290.672v41.2H744v-41.2z m-329.696-103.04h-123.632v41.216h123.632v-41.216z"
                p-id="21006"></path>
            </svg>
            <div class="right">
              <div class="right">
                <h5>投稿</h5>
                <div class="iconimg"><img style="wdith: 16rem;" src="@/assets/images/back.png" alt=""></div>
              </div>
            </div>
          </div>
          <div class="setup card">
            <svg t="1665478829468" class="card-icon" viewBox="0 0 1024 1024" version="1.1"
              xmlns="http://www.w3.org/2000/svg" p-id="20036" width="20" height="20">
              <path
                d="M711.850667 969.898667H404.309333c-50.346667 0-97.109333-26.965333-122.197333-70.656L128.170667 632.832a141.755733 141.755733 0 0 1 0-141.141333l153.770666-266.410667a141.636267 141.636267 0 0 1 122.197334-70.656h307.712c18.773333 0 34.133333 15.36 34.133333 34.133333s-15.36 34.133333-34.133333 34.133334H404.309333c-25.941333 0-50.176 13.994667-63.146666 36.522666l-153.770667 266.410667a73.096533 73.096533 0 0 0 0 72.874667l153.770667 266.410666a73.1136 73.1136 0 0 0 63.146666 36.522667h307.712c25.941333 0 50.176-13.994667 63.146667-36.522667l153.770667-266.410666c12.970667-22.528 12.970667-50.346667 0-72.874667L811.52 322.56c-9.386667-16.384-3.754667-37.205333 12.458667-46.592 16.384-9.386667 37.205333-3.754667 46.592 12.458667l117.248 203.264a141.755733 141.755733 0 0 1 0 141.141333l-153.770667 266.410667a141.4144 141.4144 0 0 1-122.197333 70.656z"
                p-id="20037"></path>
              <path
                d="M558.08 725.674667c-90.112 0-163.328-73.216-163.328-163.328s73.216-163.328 163.328-163.328 163.328 73.216 163.328 163.328-73.216 163.328-163.328 163.328z m0-258.56c-52.394667 0-95.061333 42.666667-95.061333 95.061333s42.666667 95.061333 95.061333 95.061333 95.061333-42.666667 95.061333-95.061333-42.666667-95.061333-95.061333-95.061333z"
                p-id="20038"></path>
            </svg>
            <div class="right">
              <h5>设置</h5>
              <div class="iconimg"><img style="wdith: 16rem;" src="@/assets/images/back.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="loading" class="locadingmask">
        <div class="locading"></div>
      </div>
    </div>
  </keep-alive>

</template>

<script>


export default {
  props: {
  },
  data() {
    return {
      personal: []
    }
  },

  created() {
    this.loading = true;

    this.axios.get(`https://apis.netstart.cn/one/user/info/8878093`, {}).then((res) => {
      this.personal = res.data.data
      // console.log(res);
      this.loading = false;

    })
  }
}
</script>

<style lang="less" scoped>
.personal {
  .topheader {
    height: 190rem;
    position: relative;
    color: white;

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -999;
    }

    .header-personal {
      height: 45rem;
      line-height: 45rem;
      position: absolute;
      bottom: 20rem;
      left: 10rem;

      .header-name {
        display: flex;

        .webimg {
          width: 40rem;
          height: 40rem;
          border-radius: 50%;
          border: 1rem solid white;
        }

        h3 {
          margin-left: 10rem;
        }
      }
    }
  }

  .my-totes {
    .top {
      display: flex;
      justify-content: space-between;
      margin: 10rem;
      font-weight: 400;

      h3 {}

      h5 {
        color: rgb(192, 192, 192);
      }
    }

    .newwant {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 30rem;

      .newwant-ac {
        border: 1rem dashed rgb(220, 220, 220);
        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        padding: 20rem;
        border-radius: 10rem;

        .newwant-top {
          display: flex;
          align-items: center;
          color: rgb(176, 176, 176);

          .newwant-text {}

          img {
            width: 20rem;
            height: 20rem;
          }

        }

        p.want {
          transform: scale(0.75);
          color: rgb(186, 186, 186);

          // font-size: 3rem;
        }
      }
    }
  }

  .my-collection {
    h3 {
      margin: 10rem;
      font-weight: 400;
    }

    .four-card {
      display: flex;
      align-items: center;
      justify-content: space-around;
      text-align: center;
      margin: 5rem 0 10rem;

      img {
        width: 24rem;
        height: 27rem;
      }

      h5 {
        color: rgb(126, 126, 126);

      }
    }
  }

  .bottom {
    background-color: rgb(232, 232, 232);
    height: 30vh;
    position: relative;
    margin-bottom: 100rem;

    .bottom-card {
      width: 100%;
      position: absolute;
      top: 10rem;
      left: 0;

      .card {
        display: flex;
        align-items: center;
        background-color: white;
        padding: 3rem 0;

        .card-icon {
          width: 24rem;
          height: 24rem;
          margin: 10rem;
          fill: rgb(120, 120, 120);
        }

        .right {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 50rem;
          border-bottom: 1rem solid rgb(197, 197, 197);

          .iconimg {
            width: 20rem;
            margin-right: 10rem;
          }

          h5 {}
        }
      }
    }
  }
}

.locadingmask {
  width: 100vw;
  height: calc(100vh - 50rem);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0rem;
  left: 0;
  background-color: #fff;
  z-index: 999;

  .locading {
    width: 154rem;
    height: 155rem;
    margin: 0 auto;

    background-image: url("@/assets/loading.jpg");
    background-repeat: no-repeat;
    animation-name: xxx;
    animation-duration: 3s;
    margin: 220rem auto;
    animation-iteration-count: infinite;
    animation-timing-function: steps(0, end);
  }
}
</style>