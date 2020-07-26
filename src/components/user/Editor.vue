<template>
  <v-container class="mx-auto">
    <v-text-field v-model="title" :rules="titleRules" label="title" required outlined rounded></v-text-field>
    <v-text-field v-model="tag" :rules="tagRules" label="tag" required outlined rounded></v-text-field>
    <mavon-editor ref="editor" v-model="doc" style="min-height: 800px"></mavon-editor>
  </v-container>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "userEditor",
  components: { mavonEditor },
  data: () => ({
    title: "",
    tag: "",
    doc: "",
    tagRules: [
      (v) => !!v || "tag is required",
      (v) => (v && v.length <= 10) || "tag must be less than 10 characters",
    ],
    titleRules: [
      (v) => !!v || "title is required",
      (v) => (v && v.length <= 10) || "title must be less than 10 characters",
    ],
  }),
};
</script>

<style>
</style>