<template>
  <v-app>
    <user-tag-editor></user-tag-editor>
  </v-app>
</template>

<script>
export default {
  name: "tag",
  components: {
    userTagEditor: () => import("@/components/user/tagEditor"),
  },
};
</script>