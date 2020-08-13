<template>
  <v-app>
    <user-setting></user-setting>
  </v-app>
</template>

<script>
export default {
  name: "Setting",
  components: {
    userSetting: () => import("@/components/user/Setting"),
  },
};
</script>