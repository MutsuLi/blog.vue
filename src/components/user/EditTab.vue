<template>
  <v-container>
    <v-card color="basil">
      <v-tabs v-model="tab">
        <v-tab>Edit</v-tab>
        <v-tab>Preview</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-textarea
            name="input-7-1"
            filled
            auto-grow
            value="1The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </v-tab-item>
        <v-tab-item>
          <v-textarea
            name="input-7-1"
            filled
            auto-grow
            value="2The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-container>
</template>

  
  <script>
export default {
  name: "userWrite",
  data() {
    return {
      tab: null,
      items: ["Appetizers", "Entrees", "Deserts", "Cocktails"],
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
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