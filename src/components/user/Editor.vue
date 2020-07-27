<template>
  <v-container class="mx-auto">
    <v-text-field
      class="input-title"
      v-model="title"
      :rules="titleRules"
      label="title"
      required
      outlined
      rounded
    ></v-text-field>
    <v-text-field
      class="input-tag"
      v-model="tag"
      :rules="tagRules"
      label="tag"
      required
      outlined
      rounded
    ></v-text-field>

    <mavon-editor ref="editor" class="me-editor" v-model="doc" :subfield="false" fixed></mavon-editor>
    <div class="text-right">
      <v-btn color="primary" @click="submit" bottom position="right">Submit</v-btn>
    </div>
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

<style scope lang="scss">
.input-title {
  width: 35%;
}
.input-tag {
  width: 35%;
}
.me-editor {
  z-index: -1;
  width: 100%;
  height: 75vh;
  position: absolute;
}
</style>