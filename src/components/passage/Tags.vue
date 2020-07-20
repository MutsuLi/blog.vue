<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-card-title>Article's Info</v-card-title>
    <v-card-text>
      <div>Release Time: {{ReleaseTime}}</div>
      <div>Read: {{Read}}</div>
    </v-card-text>
    <v-card-text>Tags</v-card-text>
    <v-card-text>
      <v-chip
        v-for="(tag, i) in tags"
        :key="i"
        class="mr-2"
        color="secondary"
        label
        small
        tag
        text-color="white"
      >{{ tag.text }}</v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "PassageTags",
  mounted() {
    this.$store.dispatch("getContentTags");
  },

  data: () => ({
    Read: "1",
    ReleaseTime: "2020-07-20"
  }),
  computed: {
    ...mapGetters(["tags"])
  }
};
</script>
