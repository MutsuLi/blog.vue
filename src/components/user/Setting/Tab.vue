<template>
  <v-container>
    <v-tabs vertical>
      <v-tab>Profile</v-tab>
      <v-tab>Account</v-tab>
      <v-tab-item>
        <user-setting-profile></user-setting-profile>
      </v-tab-item>
      <v-tab-item>
        <user-setting-account></user-setting-account>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

  
  <script>
export default {
  name: "userSettingTab",
  components: {
    userSettingProfile: () => import("./profile"),
    userSettingAccount: () => import("./security"),
  },
  mounted() {
    this.$store.dispatch("getUserInfo");
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