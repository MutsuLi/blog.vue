<template>
  <v-app>
    <user-article-tab></user-article-tab>
  </v-app>
</template>

<script>
export default {
  name: "Write",
  components: {
    UserArticleTab: () => import("@/components/user/Article/Index"),
  },
};
</script>