<template>
  <v-container>
    <v-text-field v-model="title" :rules="titleRules" label="title" required outlined rounded></v-text-field>
    <v-textarea
      name="input-7-1"
      filled
      auto-grow
      value="1The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
    ></v-textarea>
  </v-container>
</template>

<script>
export default {
  name: "userEditor",
  components: {},
  data: () => ({
    title: "",
    titleRules: [
      (v) => !!v || "title is required",
      (v) => (v && v.length <= 10) || "title must be less than 10 characters",
    ],
  }),
};
</script>

<style>
</style>