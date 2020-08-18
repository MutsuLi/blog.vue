// Packages
import Vue from 'vue';
import Vuetify from 'vuetify';
import { createVuetify } from '@/vuetify/index';
// Bootstrap;=
import '@/components';
import '@/plugins';
import App from './App.vue';
import router from './router';
import store from '@/store/index';
import { sync } from 'vuex-router-sync';


// create store and router instances
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


