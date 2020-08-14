<template>
  <v-card class="mx-auto" width="100%" outlined>
    <v-card-title>Hottest tags</v-card-title>
    <v-divider />
    <v-card-text>
      <v-chip-group column active-class="deep-purple--text text--accent">
        <v-chip
          v-for="item in tags"
          :key="item.id"
          :value="item.name"
          outlined
          pill
          @click="search"
          tag
        >{{ item.name }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "DrawerTags",
  computed: {
    ...mapGetters(["tag"]),
    tags() {
      return this.tag;
    },
  },
  mounted() {
    this.$store.dispatch("getTagList", { page: 1, pageSize: 10 });
  },
  methods: { async search() {} },
};
</script>
