<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <slot />
      </v-col>

      <feed-card
        v-for="(article, i) in paginatedArticles"
        :key="article.title"
        :size="layout[i]"
        :value="article"
      />
    </v-row>

    <v-row align="center">
      <v-pagination v-model="page" :length="pages" :total-visible="7" circle></v-pagination>
      <!-- <v-col cols="3">
        <base-btn
          v-if="page !== 1"
          class="ml-0"
          square
          title="Previous page"
          @click="page--"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </base-btn>
      </v-col>

      <v-col
        class="text-center subheading"
        cols="6"
      >
        PAGE {{ page }} OF {{ pages }}
      </v-col>

      <v-col
        class="text-right"
        cols="3"
      >
        <base-btn
          v-if="pages > 1 && page < pages"
          class="mr-0"
          square
          title="Next page"
          @click="page++"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </base-btn>
      </v-col>-->
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "Feed",

  components: {
    FeedCard: () => import("@/components/FeedCard")
  },

  data: () => ({
    layout: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    page: 1
  }),

  computed: {
    ...mapGetters(["passages"]),
    pages() {
      return Math.ceil(this.passages.length / 11);
    },
    paginatedArticles() {
      const start = (this.page - 1) * 11;
      const stop = this.page * 11;
      console.log(this)
      return this.passages.slice(start, stop);
    }
  },

  watch: {
    page() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
