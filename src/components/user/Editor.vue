<template>
  <v-container class="mx-auto">
    <v-form ref="form">
      <v-text-field
        class="input-title"
        ref="title"
        v-model="title"
        :rules="titleRules"
        label="title"
        required
        outlined
      ></v-text-field>
      <v-text-field
        class="input-tag"
        v-model="tag"
        ref="tag"
        :rules="tagRules"
        label="tag"
        required
        outlined
      ></v-text-field>
    </v-form>

    <v-snackbar v-model="snackbar" :color="color" light :timeout="timeout" top>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <!-- <v-alert
      dense
      colored-border
      elevation="1"
      border="top"
      dismissible
      min-height="1"
      close-icon="mdi-delete"
      transition="scale-transition"
      type="error"
    >I'm an error alert.</v-alert>-->
    <mavon-editor ref="editor" class="me-editor" v-model="doc" :subfield="false" @save="save" fixed></mavon-editor>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
  name: "userEditor",
  components: { mavonEditor },
  data: () => ({
    title: "",
    tag: "",
    doc: "",
    text: "",
    color: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    tagRules: [
      (v) => !!v || "tag is required",
      (v) => (v && v.length >= 2) || "tag must be less than 10 characters",
    ],
    titleRules: [(v) => !!v || "title is required"],
  }),
  mounted() {
    this.$store.dispatch("getUserInfo");
  },
  computed: {
    ...mapGetters(["token", "user"]),
  },
  methods: {
    save(value, render) {
      if (!this.$refs.form.validate()) {
        this.text = "Please fill in title and tag.";
        this.color = this.error;
        this.snackbar = true;
        return;
      }
      let articleBody = {
        token: this.token,
        title: this.title,
        submitter: this.user.username,
        tag: this.tag,
        tagName: this.tag,
        content: value,
      };
      console.log(articleBody);
      // this.$store.dispatch("postArticle", articleBody);
      // .then(() => {
      //   this.color = this.success;
      //   this.$router.push({
      //     path: this.redirect || "/",
      //     query: this.otherQuery,
      //   });
      // })
      // .catch((err) => {
      //   console.log(err + "login fail");
      // });
    },
  },
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