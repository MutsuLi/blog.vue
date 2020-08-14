<template>
  <v-container>
    <v-tabs vertical>
      <v-tab>editor</v-tab>
      <v-tab>tag</v-tab>
      <v-tab-item>
        <user-tag-editor></user-tag-editor>
      </v-tab-item>
      <v-tab-item>
        <user-tag-chips></user-tag-chips>
      </v-tab-item>
    </v-tabs>
  </v-container>
</template>

  
  <script>
export default {
  name: "userTagTab",
  components: {
    userTagEditor: () => import("./Editor"),
    userTagChips: () => import("./Chips"),
  },
  async mounted() {
    await this.$store.dispatch("getUserInfo");
    await this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
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