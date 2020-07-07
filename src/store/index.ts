// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     articles: require('@/data/articles.json'),
//     Passages: require('@/data/Passages.json'),
//     drawer: false,
//     items: [
//       {
//         text: 'Home',
//         href: '',
//       },
//       {
//         text: 'About',
//         href: '#about',
//       }, {
//         text: 'doc',
//         href: '',
//       },
//     ],
//   },
//   getters: {
//     categories: state => {
//       const categories: category[] = []
//       let hashMap = new Set();
//       for (const article of state.Passages) {
//         if ((typeof (article.bcategory) == "undefined") || article.bcategory == "") continue;
//         if (hashMap.has(article.bcategory)) continue;
//         hashMap.add(article.bcategory);
//         const text = article.bcategory;
//         categories.push({
//           text,
//           href: '',
//         })
//       }

//       return categories.sort().slice(0, 4)
//     },
//     links: (state, getters) => {
//       return state.items;
//     },
//     hotestList: (state, getters) => {
//       return state.Passages.sort().slice(0, 4);
//     },
//   },
//   mutations: {
//     setDrawer: (state, payload) => (state.drawer = payload),
//     toggleDrawer: state => (state.drawer = !state.drawer),
//   },
//   actions: {

//   },
// })

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


// import bannerStore from './modules/bannerStore'
// import rankStore from './modules/rankStore'
// import promoteStore from './modules/promoteStore'
// import liveStore from './modules/liveStore'
import passageStore from './modules/passageStore'

const state = {
  requesting: false,
  error: {}
}

const getters = {
  requesting: state => state.requesting,
  error: state => state.error
}

export default new Vuex.Store({
  state,
  getters,
  modules: {
    passageStore
  }
})
