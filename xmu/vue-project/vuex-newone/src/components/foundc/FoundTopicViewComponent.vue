<template>
  <div class="found-compoents">
    <div class="wrap">
      <div class="praiseand">
        <div class="title">
          <h3>评论列表</h3>
        </div>
        <ul class="item">
          <li v-for="(p,index) in praiseand?.data" :key="index">
            <div class="user-list">
              <img :src="praiseand.data.length ? `${p?.user?.web_url}` : ''" alt />
              <p>{{p?.user?.user_name}}</p>
              <span>{{p?.input_date}}</span>
            </div>
            <div class="box">
              <div class="f-box">
                <div class="card">
                  <div class="f-card" v-if="p.touser!=null">
                    <p>{{p?.touser?.user_name}}: {{p?.quote}}</p>
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
                      <p>{{p?.praisenum}}</p>
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
        margin-bottom: 60rem;
        li {
          margin: 20rem 0;
          // border-bottom: 1rem solid #d1c4c4;
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
          margin: 10rem 20rem;
          .card {
            p {
              font-size: 13rem;
            }
            .f-card {
              width: 100%;
              height: 40rem;
              border: 1rem solid #8a8a8a;
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
                    margin-right: 20rem;
                  }
                }

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