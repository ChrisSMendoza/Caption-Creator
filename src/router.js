import Vue from 'vue'
import Router from 'vue-router'
import CaptionCreator from './views/CaptionCreator.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home', // might want to change name
      component: CaptionCreator
    },
  ]
})
