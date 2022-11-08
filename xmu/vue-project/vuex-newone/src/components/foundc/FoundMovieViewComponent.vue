<template>
  <div class="found-compoents">
    <div class="wrap">
      <div class="author" v-if="author.length">
        <div class="title">
          <h3>作者</h3>
        </div>
        <div class="card">
          <img :src="author.length ? `${author[0]?.web_url}?imageView2/1/w/50/h/50/q/75` : ''" alt />
          <div class="box">
            <h3>{{author[0]?.user_name}}</h3>
            <p>{{author[0]?.summary}}</p>
          </div>
          <div class="focuson">关注</div>
        </div>
      </div>
      <div class="rela" v-if="rela.length">
        <div class="title">
          <h3>相关推荐</h3>
        </div>
        <ul class="item">
          <li v-for="r in rela" :key="r.content_id">
            <span class="of">
              <p>阅读</p>
            </span>
            <span class="card">
              <p>{{r?.title}}</p>
              <p>文 / {{r?.author_list[0]?.user_name}}</p>
            </span>
          </li>
        </ul>
      </div>
      <div class="praiseand">
        <div class="title">
          <h3>评论列表</h3>
        </div>
        <ul class="item">
          <li v-for="(p,index) in praiseand?.data" :key="index">
            <div class="user-list">
              <img :src="praiseand.data.length ? `${p.user?.web_url}` : ''" alt />
              <p>{{p?.user?.user_name}}</p>
              <span>{{p?.input_date}}</span>
            </div>
            <div class="box">
              <div class="f-box">
                <div class="card">
                  <div class="f-card" v-if="p.touser!=null">
                    <p>{{p.touser.user_name}}: {{p.quote}}</p>
                  </div>
                  <p>{{p?.content}}</p>
                </div>
                <div class="f-fot">
                  <p></p>
                  <div class="icon">
                    <span>
                      <img src="@/assets/images/bottom_comment.png" alt />
                    </span>
                    <span class="praisenum">
                      <img src="@/assets/images/comment_laud.png" alt />
                      <p>{{p.praisenum}}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    author: Array,
    rela: Array,
    praiseand: Object
  }
};
</script>

<style lang="less" scoped>
.found-compoents {
  width: 100%;
  position: absolute;
  .wrap {
    margin: 0 15rem;
    .author {
      .title {
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        position: relative;
        margin: 20rem 0;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 4rem solid rgb(12, 12, 12);
          padding: 0 25rem;
        }
        h3 {
          font-size: 15rem;
          padding-bottom: 10rem;
        }
      }
      .card {
        display: flex;
        justify-content: space-between;
        align-items: center;
        img {
          border-radius: 50%;
        }
        .box {
          h3 {
            font-size: 15rem;
            color: #333;
            font-weight: 500;
          }
          p {
            font-size: 12rem;
            color: #a8a2a2;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .focuson {
          flex-shrink: 0;
          width: 40rem;
          height: 30rem;
          line-height: 30rem;
          text-align: center;
          border: 1rem solid #8a8a8a;
        }
      }
    }
    .rela {
      .title {
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        position: relative;
        margin: 20rem 0;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 4rem solid rgb(12, 12, 12);
          padding: 0 25rem;
        }
        h3 {
          font-size: 15rem;
          padding-bottom: 10rem;
        }
      }
      ul.item {
        display: flex;
        flex-wrap: wrap;
        li {
          width: 100%;
          height: 40rem;
          display: flex;
          align-items: center;
          margin: 10rem 0;
          span.of {
            width: 40rem;
            height: 40rem;
            // text-align: center;
            line-height: 40rem;
            font-size: 15rem;
            color: #8a8a8a;
          }
          span.card {
            flex: 1;
            margin-left: 10rem;
            p {
              &:nth-child(1) {
                font-size: 15rem;
                color: #333;
                font-weight: 500;
              }
              &:nth-child(2) {
                font-size: 12rem;
                color: #8a8a8a;
              }
            }
          }
        }
      }
    }
    .praiseand {
      .title {
        width: fit-content;
        width: -webkit-fit-content;
        width: -moz-fit-content;
        position: relative;
        margin: 20rem 0;
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          border-bottom: 4rem solid rgb(12, 12, 12);
          padding: 0 25rem;
        }
        h3 {
          font-size: 15rem;
          padding-bottom: 10rem;
        }
      }
      ul.item {
        li {
          margin: 20rem 0;
          border-bottom: 1rem solid #d1c4c4;
          div.user-list {
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
              width: 20rem;
              height: 20rem;
              border-radius: 50%;
            }
            p {
              flex: 1;
              font-size: 14rem;
              color: #8a8a8a;
              margin-left: 10rem;
            }
            span {
              font-size: 12rem;
              color: #747474;
            }
          }
        }
      }
      div.box {
        .f-box {
          margin: 10rem 0rem;
          .card {
            p {
              font-size: 13rem;
            }
            .f-card {
              width: 100%;
              height: 40rem;
              border: 1rem solid #e8e8e8;
              margin: 10rem 0;
              p {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
                padding: 0 10rem;
              }
            }
          }
          .f-fot {
            height: 30rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .icon {
              height: 100%;
              display: flex;
              align-items: center;
              img {
                width: 20rem;
                height: 20rem;
              }
              span {
                &:nth-child(1) {
                  img {
                    margin-top: 10rem;
                  }
                }
                margin: 0 20rem;
              }
              .praisenum {
                display: flex;
                align-items: center;
                p {
                  color: #8a8a8a;
                  margin-top: 3rem;
                  margin-left: 5rem;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>