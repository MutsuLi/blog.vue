<template>
  <v-container class="mx-auto">
    <v-form ref="form">
      <v-text-field
        class="input-tag-name"
        ref="name"
        v-model="name"
        :rules="nameRules"
        label="name"
        required
        outlined
      ></v-text-field>
      <v-text-field
        class="input-tag-display-name"
        ref="display-name"
        v-model="displayname"
        :rules="nameRules"
        label="displayname"
        required
        outlined
      ></v-text-field>
      <v-textarea
        class="input-tag-description"
        ref="description"
        v-model="description"
        :rules="nameRules"
        label="description"
        required
        outlined
      ></v-textarea>
    </v-form>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      class="tips"
      light
      :timeout="timeout"
      right
      top
      absolute
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
    <v-row justify="center" align="center">
      <v-chip-group column active-class="deep-purple--text text--accent">
        <v-chip v-for="item in tags" :key="item.id" :value="item.name">{{ item.name }}</v-chip>
      </v-chip-group>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userTagEditor",
  data: () => ({
    model: null,
    name: "",
    displayname: "",
    // tag: "",
    desc: "",
    text: "",
    color: "",
    search: "",
    description: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    nameRules: [(v) => !!v || "tag name is required"],
    isLoading: false,
  }),
  components: {},
  computed: {
    ...mapGetters(["tag"]),
    tags() {
      return this.tag;
    },
  },
  async mounted() {
    await this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
  },
  methods: {},
};
</script>

<style scope lang="scss">
.mx-auto {
  width: 66%;
  z-index: 1501;
}
.input-tag-name {
  //   width: 35%;
  z-index: 1501;
}
.input-tag-display-name {
  //   width: 35%;
  z-index: 1501;
}
.input-tag-description {
  //   width: 35%;
  z-index: 1501;
}
.tips {
  z-index: 2000;
}
</style>