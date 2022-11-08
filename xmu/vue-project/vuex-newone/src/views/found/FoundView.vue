<template>
  <div class="found">
    <div class="wrap">
      <div class="wrap-top">
        <ul class="item">
          <li v-for="n in nameList" :key="n.id">
            <a
              href="javascript:;"
              @click="activeIndex=n.id"
              :class="{active:(activeIndex==n.id)}"
            >{{n.text}}</a>
          </li>
        </ul>
        <div class="search" @click="$router.push({path:'/search' , query:{}})">
          <img src="@/assets/images/icon_search.png" alt />
        </div>
      </div>
      <FoundSssay v-if="activeIndex==1" class="animate__animated animate__fadeInRight" />
      <Foundbydate v-if="activeIndex==2" class="animate__animated animate__fadeInRight" />
      <FoundTopic v-if="activeIndex==3" class="animate__animated animate__fadeInRight" />
      <FoundRank v-if="activeIndex==4" class="animate__animated animate__fadeInRight" />
      <FoundQuestion v-if="activeIndex==5" class="animate__animated animate__fadeInRight" />
      <FoundMusic v-if="activeIndex==6" class="animate__animated animate__fadeInRight" />
      <FoundMovie v-if="activeIndex==7" class="animate__animated animate__fadeInRight" />
      <FoundRadio v-if="activeIndex==8" class="animate__animated animate__fadeInRight" />
      <FoundAuthor v-if="activeIndex==9" class="animate__animated animate__fadeInRight" />
    </div>
  </div>
</template>

<script>
import FoundSssay from "@/components/foundc/FoundSssay.vue";
import Foundbydate from "@/components/foundc/FoundBydate.vue";
import FoundTopic from "@/components/foundc/FoundTopic.vue";
import FoundRank from "@/components/foundc/FoundRank.vue";
import FoundQuestion from "@/components/foundc/FoundQuestion.vue";
import FoundMusic from "@/components/foundc/FoundMusic.vue";
import FoundMovie from "@/components/foundc/FoundMovie.vue";
import FoundRadio from "@/components/foundc/FoundRadio.vue";
import FoundAuthor from "@/components/foundc/FoundAuthor.vue";
export default {
  components: {
    FoundSssay,
    Foundbydate,
    FoundTopic,
    FoundRank,
    FoundQuestion,
    FoundMusic,
    FoundMovie,
    FoundRadio,
    FoundAuthor
  },
  data() {
    return {
      nameList: [
        { id: 1, instructions: "essay", text: "阅读" },
        { id: 2, instructions: "bydate", text: "图文" },
        { id: 3, instructions: "topic", text: "专题" },
        { id: 4, instructions: "rank", text: "热榜" },
        { id: 5, instructions: "question", text: "问答" },
        { id: 6, instructions: "music", text: "音乐" },
        { id: 7, instructions: "movie", text: "影视" },
        { id: 8, instructions: "radio", text: "电台" },
        { id: 9, instructions: "author", text: "作者" }
      ],
      activeIndex: 3
    };
  }
};
</script>

<style lang="less" scoped>
.found {
  .wrap {
    position: relative;
    .wrap-top {
      width: 100%;
      height: 45rem;
      background-color: rgb(255, 255, 255);
      position: fixed;
      top: 0;
      left: 0;
      z-index: 300;
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
          width: 15%;
          flex-shrink: 0;
          margin: 0 25rem;
          &:nth-child(9) {
            margin-right: 45rem;
          }
          a {
            text-decoration: none;
            color: #a8a2a2;
            font-size: 13rem;
            font-weight: 700;
            &.active {
              font-size: 20rem;
              color: #333333;
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