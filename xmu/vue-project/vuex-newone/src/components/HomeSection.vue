<template>
  <keep-alive>
    <div class="home-section">
      <div class="wrap">
        <div class="card-top">
          <div class="conten-top" v-for="c in contentList.slice(0,1)" :key="c.id">
            <img class="c-icon" :src="`${c?.img_url}`" alt @click="showsection=true" />
            <div class="title">
              <div class="box">
                <p>{{c?.title}}</p>
                <span>|</span>
                <p>{{c?.pic_info}}</p>
              </div>
              <h3>{{c?.forward}}</h3>
              <h5>{{c?.words_info}}</h5>
            </div>
          </div>
          <div class="con-fot">
            <div class="f-icon">
              <img src="@/assets/images/discovery.png" alt />
              <span>小记</span>
            </div>
            <div class="icon">
              <span>
                <div class="bg1"></div>
              </span>
              <span>
                <div class="bg1" v-if="!photographyListCol.map(o => o?.item_id).includes(contentList[0]?.item_id)"
                  @click="addPhotographyListCol({photographyCol:contentList[0]})"></div>
                <div class="bg2" v-else @click="removePhotographyListCol({photographyCol:contentList[0]})"></div>
              </span>
              <span>
                <div class="bg1" v-if="!photographyList.map(o => o.id).includes(contentList[0]?.id)"
                  @click="addPhotographyList({photography:contentList[0]})"></div>
                <div class="bg2" v-else @click="removePhotographyList({photography:contentList[0]})"></div>
                <span>{{photographyList.map(o => o.id).includes(contentList[0]?.id) ? (photographyList.map(o =>
                o).filter(o => o.id == contentList[0]?.id)[0]?.like_count + 1) : contentList[0]?.like_count}}</span>
              </span>
              <span @click="show=true">
                <div class="bg1"></div>
              </span>
            </div>
          </div>
        </div>
        <div class="card-content">
          <div class="card-one">
            <ul class="item">
              <li v-for="c in contentList.slice(1,2)" :key="c.id"
                @click="$router.push({path:'/say' , query:{id:c?.item_id,name:c?.share_list?.wx_timeline?.title.slice(0,2)}})">
                <div class="title">
                  <h5>- {{c?.share_list?.wx_timeline?.title.slice(0,2)}} -</h5>
                  <div class="box">
                    <h1>{{c?.title}}</h1>
                    <p>文 / {{c?.author?.user_name}}</p>
                  </div>
                  <p class="forward">{{c?.forward}}</p>
                </div>
                <div class="img">
                  <img :src="`${c?.img_url}`" alt />
                </div>
                <div class="icon">
                  <span>

                    <div class="bg1" v-if="!photographyList.map(o => o.id).includes(c?.id)"
                      @click.stop="addPhotographyList({photography:c})"></div>
                    <div class="bg2" v-else @click.stop="removePhotographyList({photography:c})"></div>
                    <span>{{photographyList.map(o => o.id).includes(c?.id) ? (photographyList.map(o => o).filter(o =>
                    o.id
                    == c?.id)[0]?.like_count + 1) : c?.like_count}}</span>
                  </span>
                  <span @click.stop="show=true">
                    <div class="bg1"></div>
                    <!-- <img src="@/assets/images/discover_repost.png" alt /> -->
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-tow">
            <ul class="item">
              <li v-for="c in contentList.slice(2,3)" :key="c.id"
                @click="$router.push({path:'/question' , query:{id:c.content_id}})">
                <div class="title">
                  <h5>- {{c?.share_list?.wx_timeline?.title.slice(0,2)}} -</h5>
                  <div class="box">
                    <h1>{{c?.title}}</h1>
                    <p>{{c?.answerer?.user_name}}答</p>
                  </div>
                  <p class="forward">{{c?.forward}}</p>
                </div>
                <div class="img">
                  <img :src="`${c?.img_url}`" alt />
                </div>
                <div class="icon">
                  <span>

                    <div class="bg1" v-if="!photographyList.map(o => o.id).includes(c?.id)"
                      @click.stop="addPhotographyList({photography:c})"></div>
                    <div class="bg2" v-else @click.stop="removePhotographyList({photography:c})"></div>
                    <span>{{photographyList.map(o => o.id).includes(c?.id) ? (photographyList.map(o => o).filter(o =>
                    o.id
                    == c?.id)[0]?.like_count + 1) : c?.like_count}}</span>
                  </span>
                  <span @click.stop="show=true">
                    <div class="bg1"></div>
                    <!-- <img src="@/assets/images/discover_repost.png" alt /> -->
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-three">
            <ul class="item">
              <li v-for="c in contentList.slice(3,4)" :key="c.id"
                @click="$router.push({path:'/say' , query:{id:c.item_id,name:c?.share_list?.wx_timeline?.title.slice(0,2),newName:c?.tag_list[0]?.title}})">
                <div class="title">
                  <h5 v-if="c?.tag_list.length">-{{c?.tag_list[0].title}}-</h5>
                  <h5 v-else>- {{c?.share_list?.wx_timeline?.title.slice(0,2)}} -</h5>
                  <div class="box">
                    <h1>{{c?.title}}</h1>
                    <p>文 / {{c?.author?.user_name}}</p>
                  </div>
                  <p class="forward">{{c?.forward}}</p>
                </div>
                <div class="img">
                  <img :src="`${c?.img_url}`" alt />
                </div>
                <div class="icon">
                  <span>
                    <div class="bg1" v-if="!photographyList.map(o => o.id).includes(c?.id)"
                      @click.stop="addPhotographyList({photography:c})"></div>
                    <div class="bg2" v-else @click.stop="removePhotographyList({photography:c})"></div>
                    <span>{{photographyList.map(o => o.id).includes(c?.id) ? (photographyList.map(o => o).filter(o =>
                    o.id
                    == c?.id)[0]?.like_count + 1) : c?.like_count}}</span>

                  </span>
                  <span @click.stop="show=true">
                    <div class="bg1"></div>
                    <!-- <img src="@/assets/images/discover_repost.png" alt /> -->
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div class="card-four">
            <ul class="item item-three">
              <li v-for="c in contentList.slice(4)" :key="c.id"
                @click="$router.push({path:'/radio' , query:{id:c.item_id}})">
                <div class="title">
                  <h5>- {{c?.share_list?.wx_timeline?.title.slice(3,5)}} -</h5>
                </div>
                <div class="img">
                  <!-- <img :src="`${c?.img_url}`" alt /> -->
                  <div class="bg" :style="{backgroundImage:`url(${c?.img_url})`}">
                    <div class="box">
                      <h5>{{c?.volume}}</h5>
                      <p>{{c?.title}}</p>
                      <img src="@/assets/images/radio.png" alt />
                      <!-- <img src="@/assets/images/feeds_radio_pause.png" alt /> -->
                    </div>
                  </div>
                </div>
                <div class="icon">
                  <div class="f-icon">
                    <img :src="`${c?.author?.web_url}?imageView2/1/w/20/h/20/q/75`" alt />
                    <p>{{c?.author?.user_name}}</p>
                  </div>
                  <div class="r-icon">
                    <span>
                      <div class="bg1" v-if="!photographyList.map(o => o.id).includes(c?.id)"
                        @click.stop="addPhotographyList({photography:c})"></div>
                      <div class="bg2" v-else @click.stop="removePhotographyList({photography:c})"></div>
                      <span>{{photographyList.map(o => o.id).includes(c?.id) ? (photographyList.map(o => o).filter(o =>
                      o.id
                      == c?.id)[0]?.like_count + 1) : c?.like_count}}</span>

                    </span>
                    <span @click.stop="show=true">
                      <div class="bg1"></div>
                      <!-- <img src="@/assets/images/discover_repost.png" alt /> -->
                    </span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="section-mask animate__animated animate__fadeInUp" v-if="showsection">
          <div class="s-mask" @click="showsection = false">
            <div class="card" @click.stop>
              <h3>{{contentList[0]?.share_info?.title}}</h3>
              <img :src="contentList[0] ? `${contentList[0]?.img_url}` : ''" alt />
              <div class="t-box">
                <p>{{contentList[0]?.title}}</p>
                <span>|</span>
                <p>{{contentList[0]?.pic_info}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mask animate__animated animate__fadeInUp" v-if="show">
          <div class="clear" @click="show=false">
            <img src="@/assets/images/close_pressed.png" alt />
          </div>
          <div class="icon">
            <span>
              <img src="@/assets/images/bubble_moment.png" alt />
            </span>
            <span>
              <img src="@/assets/images/bubble_wechat.png" alt />
            </span>
            <span>
              <img src="@/assets/images/bubble_qq.png" alt />
            </span>
            <span>
              <img src="@/assets/images/bubble_weibo.png" alt />
            </span>
            <span>
              <img src="@/assets/images/bubble_copy_link.png" alt />
            </span>
          </div>
        </div>
      </div>
    </div>
  </keep-alive>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  props: {
    dataList: Array,
    weather: Object,
    showList: Object
  },
  data() {
    return {
      currentDate: 0,
      ImgMove: -1,
      contentList: [],
      showsection: false,
      show: false
    };
  },
  computed: {
    ...mapState(["photographyList", "photographyListCol"]),
    getDate() {
      return this.showList ? this.showList?.date : "0";
    }
  },
  created() {
    this.axios
      .get(`https://apis.netstart.cn/one/channel/one/${this.getDate}`)
      .then(res => {
        this.contentList = res?.data?.data?.content_list;
      });

  },
  methods: {
    ...mapMutations(["addPhotographyList", "removePhotographyList", "addPhotographyListCol", "removePhotographyListCol"])
  }
};
</script>

<style lang="less" scoped>
div.home-section {
  margin-top: 53rem;
  margin-bottom: 53rem;
  width: 100%;
  height: 100%;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  .wrap {
    background-color: #f3f3f3;

    .card-top {
      background-color: #fff;

      .conten-top {
        box-shadow: 0 0 2rem 0 #a6a6a6;
        border-radius: 10rem;
        margin: 0 20rem;
        // height: 80vh;
        margin-bottom: 10rem;
        background-color: rgb(255, 255, 255);

        img.c-icon {
          border-radius: 10rem 10rem 0 0;
        }

        .title {
          height: 50%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .box {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 10rem 0;
            color: #a8a2a2;

            p {
              transform: scale(.8);
            }
          }

          h3 {
            font-size: 12rem;
            color: #333333;
            margin: 0 20rem;
            margin-top: 20rem;
            margin-bottom: 60rem;
            font-weight: 700;
            line-height: 20rem;
          }

          h5 {
            margin: 0 auto;
            margin-bottom: 20rem;
            font-size: 12rem;
            color: #a8a2a2;
            transform: scale(.8);
          }
        }
      }

      .con-fot {
        border-radius: 0 0 10rem 10rem;
        width: 100%;
        height: 50px;
        margin-top: 20rem;
        padding-bottom: 20rem;
        background-color: #fdfdfd;
        display: flex;
        justify-content: space-between;
        align-items: center;

        div.f-icon {
          margin-left: 25rem;
          display: flex;
          align-items: center;

          img {
            width: 20rem;
            height: auto;
          }

          span {
            margin-left: 3rem;
            margin-bottom: 2rem;
            color: #a8a2a2;
            transform: scale(.9);
          }
        }

        div.icon {
          display: flex;
          margin-right: 5rem;

          span {
            display: flex;
            margin: 0 17rem;
            position: relative;
            // transform: scale(.9);

            &:nth-child(1) {
              .bg1 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/diary_icon.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }
            }

            &:nth-child(2) {
              .bg1 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/bubble_collect.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }

              .bg2 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/bubble_collected.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }
            }

            &:nth-child(3) {
              .bg1 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/feeds_laud_default.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }

              .bg2 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/bottom_laud_selected.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }
            }

            &:nth-child(4) {
              .bg1 {
                width: 20rem;
                height: 20rem;
                background-image: url(@/assets/images/discover_repost.png);
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
              }
            }

            p {
              font-size: 10rem;
              color: #a8a2a2;
            }

            img {
              width: 20rem;
              height: 20rem;
            }

            span {
              position: absolute;
              left: 1rem;
              bottom: 3rem;
              color: #a6a6a6;
              transform: scale(.7);
            }
          }
        }
      }
    }

    .card-content {
      .card-one {
        background-color: #fff;

        ul.item {
          margin: 0 20rem;

          li {
            margin: 10rem 0;

            .title {
              h5 {
                text-align: center;
                color: #a8a2a2;
                font-size: 12;
                padding: 15rem 0;
                transform: scale(.8);
              }

              p.forward {
                font-size: 12rem;
                color: #797979;
                font-weight: 500;
                margin: 15rem 0 10rem;
              }

              .box {
                margin-bottom: 15rem;

                h1 {
                  font-size: 15rem;
                  color: #333333;
                  font-weight: 700;
                }

                p {
                  margin-top: 3rem;
                  color: #a8a2a2;
                  font-size: 12rem;
                  transform: scale(.8) translate(-40rem);
                }
              }
            }

            .img {
              img {
                border-radius: 10rem;
              }
            }

            .icon {
              display: flex;
              align-items: center;
              justify-content: end;
              padding: 20rem 0;

              span {
                // margin: 0 18rem;
                position: relative;

                &:nth-child(1) {
                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/feeds_laud_default.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }

                  .bg2 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/bottom_laud_selected.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }

                &:nth-child(2) {
                  margin-left: 40rem;

                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/discover_repost.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }


                img {
                  width: 20rem;
                  height: 20rem;
                }

                span {
                  position: absolute;
                  left: -20rem;
                  bottom: 3rem;
                  color: #a6a6a6;
                  transform: scale(.7);
                }
              }
            }
          }
        }
      }

      .card-tow {
        background-color: #fff;

        ul.item {
          margin: 0 20rem;

          li {
            margin: 10rem 0;

            .title {

              h5 {
                text-align: center;
                color: #a8a2a2;
                font-size: 12;
                padding: 15rem 0;
                transform: scale(.8);
              }

              p.forward {
                font-size: 12rem;
                color: #797979;
                font-weight: 500;
                margin: 15rem 0 10rem;
              }

              .box {
                margin-bottom: 15rem;

                h1 {
                  font-size: 15rem;
                  color: #333333;
                  font-weight: 700;
                }

                p {
                  margin-top: 3rem;
                  color: #a8a2a2;
                  font-size: 12rem;
                  transform: scale(.8) translate(-40rem);
                }
              }
            }

            .img {
              img {
                border-radius: 10rem;
              }
            }

            .icon {
              display: flex;
              align-items: center;
              justify-content: end;
              padding: 20rem 0;

              span {
                // margin: 0 18rem;
                position: relative;

                &:nth-child(1) {
                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/feeds_laud_default.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }

                  .bg2 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/bottom_laud_selected.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }

                &:nth-child(2) {
                  margin-left: 40rem;

                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/discover_repost.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }

                img {
                  width: 20rem;
                  height: 20rem;
                }

                span {
                  position: absolute;
                  left: -20rem;
                  bottom: 3rem;
                  color: #a6a6a6;
                  transform: scale(.7);
                }
              }
            }
          }
        }
      }

      .card-three {
        background-color: #fff;

        ul.item {
          margin: 0 20rem;

          li {
            margin: 10rem 0;

            .title {

              h5 {
                text-align: center;
                color: #a8a2a2;
                font-size: 12;
                padding: 15rem 0;
                transform: scale(.8);
              }

              p.forward {
                font-size: 12rem;
                color: #797979;
                font-weight: 500;
                margin: 15rem 0 10rem;
              }

              .box {
                margin-bottom: 15rem;

                h1 {
                  font-size: 15rem;
                  color: #333333;
                  font-weight: 700;
                }

                p {
                  margin-top: 3rem;
                  color: #a8a2a2;
                  font-size: 12rem;
                  transform: scale(.8) translate(-40rem);
                }
              }
            }

            .img {
              img {
                border-radius: 10rem;
              }

            }

            .icon {
              display: flex;
              align-items: center;
              justify-content: end;
              padding: 20rem 0;

              span {
                // margin: 0 18rem;
                position: relative;

                &:nth-child(1) {
                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/feeds_laud_default.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }

                  .bg2 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/bottom_laud_selected.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }

                &:nth-child(2) {
                  margin-left: 40rem;

                  .bg1 {
                    width: 20rem;
                    height: 20rem;
                    background-image: url(@/assets/images/discover_repost.png);
                    background-size: contain;
                    background-position: center;
                    background-repeat: no-repeat;
                  }
                }

                img {
                  width: 20rem;
                  height: 20rem;
                }

                span {
                  position: absolute;
                  left: -20rem;
                  bottom: 3rem;
                  color: #a6a6a6;
                  transform: scale(.7);
                }
              }
            }
          }
        }
      }

      .card-four {
        background-color: #fff;
        margin-bottom: 60px;

        ul.item {
          margin: 0 20rem;

          li {
            margin: 10rem 0;

            .title {
              h5 {
                text-align: center;
                color: #a8a2a2;
                font-size: 12;
                padding: 15rem 0;
                transform: scale(.8);
              }
            }

            .img {
              img {
                border-radius: 10rem;
              }

              .bg {
                border-radius: 10rem;
                width: 335rem;
                height: 150rem;
                background-size: cover;
                background-position: 0rem -30rem;

                position: relative;

                .box {
                  width: 100%;
                  position: absolute;
                  bottom: 10rem;
                  // left: 10rem;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;

                  h5 {
                    position: absolute;
                    top: -115rem;
                    left: 10rem;
                    color: #c0c0c0;
                  }

                  p {
                    font-size: 14rem;
                    color: #e8e8e8;
                    padding-left: 10rem;
                  }

                  img {
                    width: 20rem;
                    margin-right: 10rem;
                  }

                }
              }
            }

            .icon {
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 20rem 0;

              .f-icon {
                display: flex;
                align-items: center;

                img {
                  border-radius: 50%;
                }

                p {
                  margin-left: 5rem;
                  color: #a6a6a6;
                }
              }

              .r-icon {
                display: flex;
                align-items: center;

                span {
                  // margin: 0 18rem;
                  position: relative;

                  &:nth-child(1) {
                    .bg1 {
                      width: 20rem;
                      height: 20rem;
                      background-image: url(@/assets/images/feeds_laud_default.png);
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                    }

                    .bg2 {
                      width: 20rem;
                      height: 20rem;
                      background-image: url(@/assets/images/bottom_laud_selected.png);
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                    }
                  }

                  &:nth-child(2) {
                    margin-left: 40rem;

                    .bg1 {
                      width: 20rem;
                      height: 20rem;
                      background-image: url(@/assets/images/discover_repost.png);
                      background-size: contain;
                      background-position: center;
                      background-repeat: no-repeat;
                    }
                  }

                  img {
                    width: 20rem;
                    height: 20rem;
                  }

                  span {
                    position: absolute;
                    left: -20rem;
                    bottom: 3rem;
                    color: #a6a6a6;
                    transform: scale(.7);
                  }
                }
              }
            }
          }
        }
      }
    }

    .section-mask {
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      background-color: rgba(0, 0, 0, 0.85);
      z-index: 305;
      color: #e8e8e8;

      .s-mask {
        height: 100%;
        margin: 0 20rem;

        .card {
          transform: translateY(100rem);

          h3 {
            margin-bottom: 10rem;
            margin-left: 5rem;
            transform: scale(.8) translate(-40rem);
          }

          .t-box {
            display: flex;
            align-items: center;
            margin: 10rem 0;
            margin-left: 5rem;
            transform: scale(.8) translate(-40rem);

            span {
              padding: 0 5rem;
            }
          }
        }
      }
    }

    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      background-color: #fff;
      z-index: 301;
      display: flex;
      flex-direction: column;

      div.clear {
        text-align: right;

        img {
          width: 40rem;
          margin: 10rem;
        }
      }

      div.icon {
        display: flex;
        flex-wrap: wrap;

        span {
          width: 100%;
          display: block;
          text-align: center;
          margin: 30rem 0;

          img {
            width: 35rem;
          }
        }
      }
    }
  }
}
</style>

