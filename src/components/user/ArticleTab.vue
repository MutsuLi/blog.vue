<template>
  <v-container>
    <v-card color="primary">
      <v-tabs v-model="tab">
        <v-tab>Edit</v-tab>
        <v-tab>Preview</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <user-editor></user-editor>
        </v-tab-item>
        <v-tab-item>
          <user-preview />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

  
  <script>
export default {
  name: "userArticleTab",
  components: {
    UserEditor: () => import("./Editor"),
    UserPreview: () => import("./Preview"),
  },
  data() {
    return {
      tab: null,
    };
  },
};
</script>

  <style>
.basil {
  background-color: #fffbe6 !important;
}
.basil--text {
  color: #356859 !important;
}
</style>>