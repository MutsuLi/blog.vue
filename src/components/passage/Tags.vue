<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-card-title>Article's Info</v-card-title>
    <v-card-text>
      <div>Release Time: {{ReleaseTime}}</div>
      <div>Read: {{Read}}</div>
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

  data: () => ({
    Read: "1",
    ReleaseTime: "2020-07-20",
    tags: [
      {
        text: "dotnet",
        href: "/passage"
      },
      {
        text: "database",
        href: "/passage"
      }
    ]
  })
  // computed: {
  //   ...mapGetters(["tags"])
  // }
};
</script>
