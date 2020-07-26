<template>
  <v-container>
    <base-markdown />
  </v-container>
</template>

<script>
export default {
  name: "userPreview",
  components: {
    BaseMarkdown: () => import("@/components/base/Markdown"),
  },
};
</script>

<style>
</style>