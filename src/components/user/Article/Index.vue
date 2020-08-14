<template>
  <v-container>
    <v-card outlined>
      <v-card-title>Edit Article</v-card-title>
      <user-editor></user-editor>
    </v-card>
  </v-container>
</template>

  
  <script>
export default {
  name: "userArticleTab",
  components: {
    UserEditor: () => import("./Editor"),
    // UserPreview: () => import("./Preview"),
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

<style>
</style>