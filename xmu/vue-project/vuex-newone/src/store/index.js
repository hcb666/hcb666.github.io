import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    year: new Date().getFullYear(),
    date: new Date().getDate(),
    month: new Date().getMonth() + 1,
    updatemonth: 0,

    photographyList: JSON.parse(localStorage.getItem("photography")) || [],

    photographyListCol:JSON.parse(localStorage.getItem("photographycol")) || [],

    authorList: JSON.parse(localStorage.getItem("author")) || [],

    collectionList: JSON.parse(localStorage.getItem("collection")) || [],

    audioUrl: null
  },
  getters: {
    setMonth(state) {
      switch (state.month) {
        case 1:
          return "Jan";
        case 2:
          return "Feb";

        case 3:
          return "Mar";

        case 4:
          return "Apr";

        case 5:
          return "May";

        case 6:
          return "Jun";

        case 7:
          return "Jul";

        case 8:
          return "Aug";

        case 9:
          return "Sept";

        case 10:
          return "Oct";

        case 11:
          return "Nov";
        case 12:
          return "Dec";
      }
    }
  },
  mutations: {
    ofMonth(state, newMonth) {
      newMonth--
      state.updatemonth = newMonth--
    },
    // 摄影|图文
    addPhotographyList(state, { photography }) {
      state.photographyList = [...state.photographyList, photography]
    },
    removePhotographyList(state, { photography }) {
      state.photographyList = state.photographyList.filter(o => o.id != photography.id)
    },

    // 关注作者
    addAuthorList(state, { authorId }) {
      state.authorList = [...state.authorList, authorId]
    },
    removeAuthorList(state, { authorId }) {
      state.authorList = state.authorList.filter(o => o != authorId)
    },

    // 收藏图文
    addPhotographyListCol(state, { photographyCol }) {
      state.photographyListCol = [...state.photographyListCol, photographyCol]
    },
    removePhotographyListCol(state, { photographyCol }) {
      state.photographyListCol = state.photographyListCol.filter(o => o.item_id != photographyCol.item_id)
    },

    // 收藏阅读
    addCollectionList(state, { collectionId }) {
      state.collectionList = [...state.collectionList, collectionId]
    },
    removeCollectionList(state, { collectionId }) {
      state.collectionList = state.collectionList.filter(o => o != collectionId)
    },
  },
  actions: {
  },
  modules: {
  }
})
