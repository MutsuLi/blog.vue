import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Article from '../views/Article.vue'
import Login from '../views/Login.vue'
import Join from '../views/Join.vue'

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/article',
    name: 'Article',
    component: Article
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/Join',
    name: 'Join',
    component: Join
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
