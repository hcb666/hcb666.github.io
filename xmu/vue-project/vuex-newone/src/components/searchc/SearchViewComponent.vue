<template>
  <div class="search-view animate__animated animate__fadeInUp">
    <div class="wrap">
      <div class="card-top">
        <ul class="item">
          <li v-for="n in nameList" :key="n.id" @click="activeIndex = n.id">
            <span :class="{active : activeIndex == n.id}">{{n.text}}</span>
          </li>
        </ul>
      </div>
      <SearchHpComponent v-if="activeIndex == 1" :hpList="result?.hpList" />
      <SearchReadingComponent v-if="activeIndex == 2" :readingList="result?.readingList" />
      <SearchMusicComponent v-if="activeIndex == 3" :musicList="result?.musicList" />
      <SearchMovieComponent v-if="activeIndex == 4" :movieList="result?.movieList" />
      <SearchRadioComponent v-if="activeIndex == 5" :radioList="result?.radioList" />
      <SearchAuthorComponent v-if="activeIndex == 6" :authorList="result?.authorList" />
    </div>
  </div>
</template>

<script>
import SearchHpComponent from "@/components/searchc/SearchHpComponent.vue";
import SearchReadingComponent from "@/components/searchc/SearchReadingComponent.vue";
import SearchMusicComponent from "@/components/searchc/SearchMusicComponent.vue";
import SearchMovieComponent from "@/components/searchc/SearchMovieComponent.vue";
import SearchRadioComponent from "@/components/searchc/SearchRadioComponent.vue";
import SearchAuthorComponent from "@/components/searchc/SearchAuthorComponent.vue";
export default {
  components: {
    SearchHpComponent,
    SearchReadingComponent,
    SearchMusicComponent,
    SearchMovieComponent,
    SearchRadioComponent,
    SearchAuthorComponent
  },
  props: {
    result: Object
  },
  data() {
    return {
      nameList: [
        { id: 1, text: "图文" },
        { id: 2, text: "阅读" },
        { id: 3, text: "音乐" },
        { id: 4, text: "影视" },
        { id: 5, text: "ONE电台" },
        { id: 6, text: "作者/音乐人" }
      ],
      activeIndex: 1
    };
  }
};
</script>

<style lang="less" scoped>
.search-view {
  width: 100%;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 40rem;
  left: 0;
  z-index: 300;
  .wrap {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #ffffff;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    // display: flex;
    // flex-direction: column;
    .card-top {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      background-color: #ffffff;
      width: 100%;
      ul.item {
        display: flex;
        align-items: center;
        li {
          margin: 10rem;
          span {
            font-size: 12rem;
            color: #999999;
            &.active {
              position: relative;
              color: #333;
              font-weight: 600;
              &::after {
                position: absolute;
                content: "";
                bottom: -5rem;
                left: 0;
                width: 100%;
                height: 1%;
                border-bottom: 2rem solid #333;
              }
            }
          }
        }
      }
    }
  }
}
</style>