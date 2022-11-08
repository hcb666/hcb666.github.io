<template>
  <div class="serial-view">
    <div class="wrap">
      <div class="wrap-top">
        <ul class="item">
          <li v-for="n in yearList" :key="n.id" :class="{active:(activeIndex==n.id)}">
            <a href="javascript:;" @click="activeIndex=n.id;year=n.text"
              :class="{active:(activeIndex==n.id)}">{{n.text}}</a>
          </li>
        </ul>
        <div class="search" @click="$router.push({path:'/search' , query:{}})">
          <img src="@/assets/images/icon_search.png" alt />
        </div>
      </div>
        <serialOne v-if="activeIndex==0" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialTwo v-if="activeIndex==1" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialThree v-if="activeIndex==2" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialFour v-if="activeIndex==3" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialFive v-if="activeIndex==4" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialSix v-if="activeIndex==5" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
        <serialSeven v-if="activeIndex==6" :finished="finished" class="animate__animated animate__fadeInRight"
          :year="year" />
    </div>
  </div>
</template>

<script>

import serialOne from "@/components/serialc/serialOne.vue";
import serialTwo from "@/components/serialc/serialTwo.vue";
import serialThree from "@/components/serialc/serialThree.vue";
import serialFour from "@/components/serialc/serialFour.vue";
import serialFive from "@/components/serialc/serialFive.vue";
import serialSix from "@/components/serialc/serialSix.vue";
import serialSeven from "@/components/serialc/serialSeven.vue";
export default {
  components: {
    serialOne,
    serialTwo,
    serialThree,
    serialFour,
    serialFive,
    serialSix,
    serialSeven,
  },
  data() {
    return {
      yearList: [],
      activeIndex: 0,
      year: new Date().getFullYear(),
      finished: false,
      loading: true,
    };
  },
  created() {
    for (let i = 0; i < 7; i++) {
      this.yearList.push({
        id: i,
        text: new Date().getFullYear() - i
      });
    }
  },
  mounted() {
    this.loading = false;
  },
};
</script>

<style lang="less" scoped>
.serial-view {
  .wrap {
    position: relative;

    .wrap-top {
      width: 100%;
      height: 45rem;
      background-color: rgb(255, 255, 255);
      z-index: 300;
      position: fixed;
      top: 0;
      left: 0;

      ul.item {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        overflow-x: auto;

        &::-webkit-scrollbar {
          display: none;
        }

        li {
          width: 12%;
          // padding: 2rem 0;
          height: 16rem;
          line-height: 16rem;
          flex-shrink: 0;
          margin-left: 20rem;
          background-color: #eeeeee;
          border-radius: 50rem;

          &.active {
            height: 18rem;
            line-height: 18rem;
            background-color: #3d3d3d;
          }

          &:nth-child(7) {
            margin-right: 45rem;
          }

          a {
            text-decoration: none;
            color: #a1a1a1;
            font-size: 12rem;
            font-weight: 700;

            &.active {
              color: #fff;
            }
          }
        }
      }

      div.search {
        width: 45rem;
        height: 100%;
        // text-align: center;
        line-height: 45rem;
        background-color: #fff;
        position: absolute;
        right: 0;
        top: 0;

        img {
          width: 18rem;
          margin-top: 13rem;
          margin-left: 2rem;
        }
      }
    }
  }
}
</style>