<template>
  <v-container class="pa-0">
    <base-subheading>Newest Blog Posts</base-subheading>
    <v-row v-for="(article, i) in ranks" :key="i" align="center" class="mb-2">
      <v-col class="d-flex" cols="12">
        <div>
          <div class="subheading">{{article.btitle}}</div>
          <div class="caption">{{article.bCreateTime}}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "NewestPosts",
  mounted() {
    this.$store.dispatch("getContentRank");
  },
  computed: {
    ...mapGetters(["ranks"])
  }
};
</script>
