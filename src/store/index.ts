import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '#!',
      },
      {
        text: 'About',
        href: '#about',
      },
    ],
  },
  getters: {
    categories: state => {
      const categories: category[] = []
      let hashMap = new Set();
      for (const article of state.articles) {
        if ((typeof (article.category) == "undefined") || article.category == "") continue;
        if (hashMap.has(article.category)) continue;
        hashMap.add(article.category);
        const text = article.category;
        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },
    links: (state, getters) => {
      return state.items;
    },
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {

  },
})
