// Packages
import Vue from 'vue';
import Vuetify from 'vuetify';
// Bootstrap;=
import '@/components';
import '@/plugins';
import App from './App.vue';
import router from './router';
import { createStore } from '@/store/index';
import { createVuetify } from '@/vuetify/index';
import { sync } from 'vuex-router-sync';


// create store and router instances
const store = createStore();
const vuetify = createVuetify();

store.state.app.currentVersion = Vuetify.version;
sync(store, router);

Vue.config.productionTip = false

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App),
}).$mount('#app')


