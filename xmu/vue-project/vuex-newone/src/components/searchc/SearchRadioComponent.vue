<template>
  <div class="search-hp-component">
    <div class="wrap">
      <ul class="item">
        <li v-for="ra in radioList" :key="ra.id">
          <div class="img">
            <img :src="`${ra?.cover}`" alt />
          </div>
          <div class="box">
            <h3>{{ra?.title}}</h3>
            <p>{{ra?.subtitle}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    radioList: Array
  }
};
</script>

<style lang="less" scoped>
.search-hp-component {
  width: 100%;
  position: absolute;
  top: 40rem;
  left: 0;
  .wrap {
    margin: 0 10rem;
    ul {
      margin-bottom: 50rem;

      li {
        padding: 10rem 0;
        position: relative;
        display: flex;
        align-items: center;
        &::after {
          content: "";
          border-bottom: 1rem solid #e3e3e3;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1%;
          transform: scale(1.055);
        }
      }
      .img {
        img {
          width: 40rem;
          height: 40rem;
        }
      }
      .box {
        flex: 1;
        margin-left: 10rem;
        h3 {
          font-size: 13rem;
          color: #333;
          font-weight: 500;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        p {
          font-size: 10rem;
          color: #9d9d9d;
          margin-top: 8rem;
        }
      }
    }
  }
}
</style>