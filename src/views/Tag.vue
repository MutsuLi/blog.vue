<template>
  <v-app>
    <user-tag-tab></user-tag-tab>
  </v-app>
</template>

<script>
export default {
  name: "tag",
  components: {
    userTagTab: () => import("@/components/user/Tag/index"),
  },
};
</script>