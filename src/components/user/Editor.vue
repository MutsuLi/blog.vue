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
      <v-autocomplete
        class="input-tag"
        ref="search"
        v-model="model"
        :loading="isLoading"
        :items="paginatedTag"
        color="primary"
        item-text="text"
        item-value="value"
        :search-input.sync="search"
        clear-icon="mdi-close-circle"
        placeholder="Start typing to Search"
        clearable
        hide-no-data
        hide-details
        label="tag"
        outlined
        dense
        return-object
      ></v-autocomplete>
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
    model: null,
    title: "",
    // tag: "",
    doc: "",
    text: "",
    color: "",
    search: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    // tagRules: [
    //   (v) => !!v || "tag is required",
    //   (v) => (v && v.length >= 2) || "tag must be less than 10 characters",
    // ],
    titleRules: [(v) => !!v || "title is required"],
    isLoading: false,
  }),
  mounted() {
    this.$store.dispatch("getUserInfo");
    this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  computed: {
    ...mapGetters(["token", "user", "tag"]),
    paginatedTag() {
      let list = this.tag;
      let data = [];
      for (let i = 0; i < list.length; i++) {
        let each = list[i];
        let rowItem = {
          text: each.displayname,
          value: each.id,
        };
        data.push(rowItem);
      }
      return data;
    },
  },
  methods: {
    save(value, render) {
      if (!this.$refs.form.validate() || !this.$refs.search.internalValue) {
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

      this.$store
        .dispatch("postArticle", articleBody)
        .then(() => {
          this.text = "Save aritcle successfully.";
          this.color = this.success;
          this.snackbar = true;
          // this.$router.push({
          //   path: "/",
          // });
        })
        .catch((err) => {
          console.log(err + "post fail");
        });
    },
    querySelections(val) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store
        .dispatch("getTagList", {
          page: 1,
          pageSize: 25,
          key: val,
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
  },
};
</script>

<style scope lang="scss">
.input-title {
  width: 35%;
  z-index: 1501;
}
.input-tag {
  width: 35%;
  z-index: 1501;
}
.me-editor {
  height: 100vh;
  margin-top: 2%;
  position: absolute;
}
</style>