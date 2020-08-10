<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-card-title>Article's Info</v-card-title>
    <v-card-text>
      <div>Release Time: {{ReleaseTime}}</div>
      <div>Read: {{ReadCount}}</div>
    </v-card-text>
    <v-card-text>
      <v-chip-group column>
        <v-chip
          v-for="(tag,i) in tags"
          :key="i"
          :href="tag.href"
          class="ma-2"
          color="blue"
          outlined
          pill
          small
          tag
          text-color="black"
        >{{ tag.text }}</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "PassageTags",
  // mounted() {
  //   this.$store.dispatch("getContentTags");
  // },
  computed: {
    ...mapGetters(["article"]),
    tags() {
      return this.article
        ? [
            {
              text: this.article.category,
              href: "/articles",
            },
          ]
        : [];
    },
    ReleaseTime() {
      return this.article ? this.article.createTime : "";
    },
    ReadCount() {
      return this.article ? this.article.readCount : "";
    },
  },
};
</script>
