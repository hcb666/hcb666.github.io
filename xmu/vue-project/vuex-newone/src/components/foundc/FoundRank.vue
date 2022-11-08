<template>
  <keep-alive>

  <div class="found-rank">
    <div class="wrap">
      <ul class="item">
        <li v-for="r in rankList" :key="r.id">
          <div class="introduce">
            <h3 @click="$router.push({path:'/rank' , query:{id:r.id,title:r.title}})">{{r.title}}</h3>
            <p>
              <span @click="$router.push({path:'/rank' , query:{id:r.id,title:r.title}})">完整榜单</span>
              <img src="@/assets/images/aliwx_editor_more_normal.png" alt />
            </p>
          </div>
          <div class="card">
            <div class="img" @click="$router.push({path:'/rank' , query:{id:r.id,title:r.title}})">
              <img :src="`${r?.img_url}?imageView2/1/w/90/h/90/q/75`" alt />
            </div>
            <div class="box">
              <p v-for="(i,index) in r.contents" :key="i.id" @click="$router.push({path:'/say' , query:{id:i.id}})">
                <span>{{index+1}}.</span>
                {{i.title}}
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="loading" class="locadingmask">
      <div class="locading"></div>
    </div>
  </div>
  </keep-alive>
</template>

<script>
export default {
  data() {
    return {
      rankList: [],
      loading: false
    };
  },
  created() {
    this.loading = true
    this.axios.get("https://apis.netstart.cn/one/find/rank").then(res => {
      this.rankList = res.data.data;
      this.loading = false
    });
  }
};
</script>

<style lang="less" scoped>
.found-rank {
  position: absolute;
  top: 40rem;
  left: 0;
  width: 100%;

  .wrap {
    margin: 0 20rem;

    ul.item {
      margin-bottom: 60rem;

      li {
        div.introduce {
          margin: 20rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;

          h3 {
            font-size: 15rem;
            font-weight: 700;
            color: #3e3e3e;
          }

          p {
            display: flex;
            align-items: center;

            span {
              margin-right: 5rem;
              color: #a6a6a6;
            }

            img {
              width: 8rem;
              height: 12rem;
            }
          }
        }

        div.card {
          display: flex;

          div.img {
            img {
              border-radius: 5rem;
            }
          }

          div.box {
            width: 240rem;
            flex: 1;
            margin-left: 20rem;

            p {
              font-size: 13rem;
              color: #6d6d6d;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              word-break: normal;

              span {
                font-weight: 600;
              }

              &:nth-child(1) {
                span {
                  color: #ff2929;
                }
              }

              &:nth-child(2) {
                margin: 20rem 0;

                span {
                  color: #ff8e24;
                }
              }

              &:nth-child(3) {
                span {
                  color: #ffb059;
                }
              }
            }
          }
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