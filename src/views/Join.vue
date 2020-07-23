<template>
  <v-app>
    <account-register></account-register>
  </v-app>
</template>

<script>
export default {
  name: "Join",
  components: {
    AccountRegister: () => import("@/components/account/Register"),
  },
};
</script>

<style>
</style>