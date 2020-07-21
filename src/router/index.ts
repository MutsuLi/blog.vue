import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Passage from '../views/Passage.vue'

Vue.use(VueRouter)


  const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/passage',
    name: 'Passage',
    component: Passage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
