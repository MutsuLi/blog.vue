<template>
  <v-navigation-drawer
    id="documentation-toc"
    floating
    right
    width="20%"
    height="55%"
    app
    clipped
  >
    <drawer-tags />
    <drawer-rank />
  </v-navigation-drawer>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "HomeDrawer",
  mounted() {
    this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
    this.$store.dispatch("getBlogRank", { page: 1, pageSize: 5 });
  },
  components: {
    DrawerTags: () => import("./Tags"),
    DrawerRank: () => import("./Rank"),
  },
};
</script>
