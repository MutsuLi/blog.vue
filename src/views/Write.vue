<template>
  <v-app>
    <user-edit-tab></user-edit-tab>
  </v-app>
</template>

<script>
export default {
  name: "Write",
  components: {
    UserEditTab: () => import("@/components/user/EditTab"),
  },
};
</script>