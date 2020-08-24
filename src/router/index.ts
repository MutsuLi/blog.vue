import Vue from 'vue';
import Router from 'vue-router'
import Home from '../views/Home.vue';
import Articles from '../views/Article.vue';
import Login from '../views/Login.vue';
import Join from '../views/Join.vue';
import Write from '../views/Write.vue';
import Tag from '../views/Tag.vue';
import Setting from '../views/Setting.vue';

Vue.use(Router)

export const constantRoutes = [
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
  },
  {
    path: '/tag',
    name: 'Tag',
    component: Tag
  }, {
    path: '/setting',
    name: 'Setting',
    component: Setting
  }
];

const createRouter = () => new Router({
  mode: 'history',
  routes: constantRoutes
});


const router = createRouter();

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
