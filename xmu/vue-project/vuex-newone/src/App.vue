<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="icon">
          <img src="@/assets/images/icon_home.png" alt />
          <img src="@/assets/images/icon_home_active.png" alt />
        </div>
      </router-link>
      <router-link to="/found">
        <div class="icon">
          <img src="@/assets/images/icon_found.png" alt />
          <img src="@/assets/images/icon_found_active.png" alt />
        </div>
      </router-link>
      <router-link to="/serial">
        <div class="icon">
          <img src="@/assets/images/icon_serial.png" alt />
          <img src="@/assets/images/icon_serial_active.png" alt />
        </div>
      </router-link>
      <router-link to="/my">
        <div class="icon">
          <img src="@/assets/images/icon_my.png" alt />
          <img src="@/assets/images/icon_my_active.png" alt />
        </div>
      </router-link>
    </nav>
    <keep-alive>

      <router-view />
    </keep-alive>
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapState(["photographyList", "authorList", "collectionList", "photographyListCol"])
  },
  methods: {
    ...mapMutations(["addPhotographyList", "removePhotographyList", "addAuthorList", "removeAuthorList", "addCollectionList", "removeCollectionList", "addPhotographyListCol", "removePhotographyListCol"])
  },
  watch: {
    photographyList(newPhotographyList) {
      localStorage.setItem("photography", JSON.stringify(newPhotographyList));
    },
    authorList(newAuthorList) {
      localStorage.setItem("author", JSON.stringify(newAuthorList));
    },
    collectionList(newCollection) {
      localStorage.setItem("collection", JSON.stringify(newCollection));
    },
    photographyListCol(newPhotographyListCol) {
      localStorage.setItem("photographycol", JSON.stringify(newPhotographyListCol));
    }
  }
};
</script>

<style lang="less">
#app {
  nav {
    z-index: 100;
    background-color: #fff;
    width: 100%;
    height: 51px;
    border-top: 2rem solid #f5f5f5;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;

    a {
      font-weight: bold;

      .icon img {
        width: 40rem;
        height: 40rem;

        &:nth-child(1) {
          display: block;
        }

        &:nth-child(2) {
          display: none;
        }
      }

      &.router-link-exact-active {
        .icon img {
          &:nth-child(1) {
            display: none;
          }

          &:nth-child(2) {
            display: block;
          }
        }
      }
    }
  }
}

@keyframes xxx {
  from {
    background-position-x: 0;
  }

  to {
    background-position-x: -2000px;
  }
}

.locadingmask {
  width: 100vw;
  height: calc(100vh - 50rem);
  display: flex;
  justify-content: center;
  align-items: center;
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
    /* animation-timing-function: linear; */
    animation-timing-function: steps(13, end);
  }
}
</style>
