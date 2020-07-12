import Vue from 'vue'
import vuetify from './plugins/vuetify'
import './plugins/base'
import App from './App.vue'
import router from './router'
import { createStore } from '@/store/index'
import 'vuetify/dist/vuetify.min.css'; //css 需引入
import { sync } from 'vuex-router-sync'


// create store and router instances
const store = createStore()
sync(store, router)
Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')


