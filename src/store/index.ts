import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: require('@/data/articles.json'),
    Passages: require('@/data/Passages.json'),
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '',
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
      for (const article of state.Passages) {
        if ((typeof (article.bcategory) == "undefined") || article.bcategory == "") continue;
        if (hashMap.has(article.bcategory)) continue;
        hashMap.add(article.bcategory);
        const text = article.bcategory;
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
