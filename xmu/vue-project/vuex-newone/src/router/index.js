import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SerialView from '../views/SerialView.vue'
import MyView from '../views/MyView.vue'
import FoundSssayView from '../views/found/FoundSssayView.vue'
import FoundBydateView from '../views/found/FoundBydateView.vue'
import FoundTopicView from '../views/found/FoundTopicView.vue'
import FoundRankView from '../views/found/FoundRankView.vue'
import FoundQuestionView from '../views/found/FoundQuestionView.vue'
import FoundMusicView from '../views/found/FoundMusicView.vue'
import FoundMovieView from '../views/found/FoundMovieView.vue'
import FoundRadioView from '../views/found/FoundRadioView.vue'
import FoundAuthorView from '../views/found/FoundAuthorView.vue'
import SearchView from '../views/SearchView.vue'
import SerialDetailsView from '../views/SerialDetailsView.vue'
import SerialDetailsContainerView from '../views/SerialDetailsContainerView.vue'
import MyGraphic from '../views/my/MyGraphic.vue'
import MyEssay from '../views/my/MyEssay.vue'
import MyMusic from '../views/my/MyMusic.vue'
import MyFilm from '../views/my/MyFilm.vue'
import MyRadioStation from '../views/my/MyRadioStation.vue'
import LoginView from '../views/LoginView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/found',
    name: 'found',
    component: () => import(/* webpackChunkName: "about" */ '../views/found/FoundView.vue')
  },
  {
    path: '/serial',
    name: 'serial',
    component: SerialView
  },
  {
    path: '/my',
    name: 'my',
    component: MyView,
  },
  {
    path: '/say',
    name: 'say',
    component: FoundSssayView
  },
  {
    path: '/bydate',
    name: 'bydate',
    component: FoundBydateView
  },
  {
    path: '/topic',
    name: 'topic',
    component: FoundTopicView
  },
  {
    path: '/rank',
    name: 'rank',
    component: FoundRankView
  },
  {
    path: '/question',
    name: 'question',
    component: FoundQuestionView
  },
  {
    path: '/music',
    name: 'music',
    component: FoundMusicView
  },
  {
    path: '/movie',
    name: 'movie',
    component: FoundMovieView
  },
  {
    path: '/radio',
    name: 'radio',
    component: FoundRadioView
  },
  {
    path: '/author',
    name: 'author',
    component: FoundAuthorView
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/serialDetails',
    name: 'serialDetails',
    component: SerialDetailsView
  },
  {
    path: '/serialDetailsContainer',
    name: 'serialDetailsContainer',
    component: SerialDetailsContainerView
  },
  {
    path: '/myGraphic',
    name: 'myGraphic',
    component: MyGraphic
  },
  {
    path: '/myEssay',
    name: 'myEssay',
    component: MyEssay
  },
  {
    path: '/myMusic',
    name: 'myMusic',
    component: MyMusic
  },
  {
    path: '/myFilm',
    name: 'myFilm',
    component: MyFilm
  },
  {
    path: '/myRadioStation',
    name: 'myRadioStation',
    component: MyRadioStation
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  from
  next
  to
  let token = localStorage.getItem("token");
  // console.log(to.path);
  if (to.path == '/my' && !token) {
    next({
      path: '/login'
    })
  } else {
    next()
  }
})

export default router
