import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import Articles from '../views/Article.vue';
import Login from '../views/Login.vue';
import Join from '../views/Join.vue';
import Write from '../views/Write.vue';

Vue.use(VueRouter)


const routes: Array<RouteConfig> = [
  {
    path: '',
    name: 'Home',
    component: Home
  },
  {
    path: '/articles/:bID',
    name: 'Articles',
    component: Articles
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/write',
    name: 'Write',
    component: Write
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
