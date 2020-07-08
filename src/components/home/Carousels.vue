<template>
  <v-carousel cycle height="400" hide-delimiter-background show-arrows-on-hover>
    <v-carousel-item v-for="(each, i) in ranks" :key="i" :href="each.href">
      <v-sheet height="100%" color="grey">
        <v-row class="fill-height" align="center" justify="center">
          <div class="display-3" :href="each.href">{{ each.btitle }}</div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
</template>


<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "HomeCarousels",
  data() {
    return {
      colors: [
        "indigo",
        "warning",
        "pink darken-2",
        "red lighten-1",
        "deep-purple accent-4"
      ],
      slides: ["First", "Second", "Third", "Fourth", "Fifth"]
    };
  },
  mounted() {
    this.$store.dispatch("getContentRank");
  },
  computed: {
    ...mapGetters(["ranks"])
  }
};
</script>