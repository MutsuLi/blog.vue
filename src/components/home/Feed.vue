<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>
      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="article.bId"
        :size="layout[i]"
        :value="article"
      />
    </v-row>
    <v-row align="center">
      <v-pagination
        v-model="page"
        :length="pages"
        :total-visible="7"
        circle
      ></v-pagination>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "Feed",

  components: {
    FeedCard: () => import("@/components/home/FeedCard"),
  },

  data: () => ({
    layout: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    page: 1,
  }),
  computed: {
    ...mapGetters(["articles"]),
    pages() {
      return this.articles.totalPage;
    },
    paginatedArticles() {
      return this.articles.list;
    },
  },

  watch: {
    page() {
      this.$store.dispatch("getContentRows", { page: this.page, pageSize: 11 });
      window.scrollTo(0, 0);
    },
  },
};
</script>
