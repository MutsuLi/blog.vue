<template>
  <v-container class="mx-auto">
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <p class="display-1 text--primary" align="center">Create A New Tag</p>
      </v-col>
    </v-row>
    <v-row justify="center" class="inputarea">
      <v-card class="tagcard">
        <v-form ref="tagForm">
          <v-card-text class="ma-1">
            <v-text-field
              class="input-tag-name"
              ref="name"
              v-model="name"
              :rules="nameRules"
              validate-on-blur
              label="name"
              hint="Please input the tag's name."
              required
              outlined
              rounded
            ></v-text-field>
            <v-text-field
              class="input-tag-display-name"
              ref="display-name"
              v-model="displayName"
              validate-on-blur
              :rules="nameRules"
              hint="Please input the tag's display name which will show in the chip."
              label="displayname"
              required
              outlined
              rounded
            ></v-text-field>
            <v-textarea
              class="input-tag-description"
              ref="description"
              v-model="description"
              validate-on-blur
              :rules="nameRules"
              hint="Please input the tag's display name which will show in the chip."
              label="description"
              required
              outlined
              rounded
            ></v-textarea>
          </v-card-text>
          <v-row>
            <v-col>
              <v-btn class="ma-1" color="primary" @click="clear" left bottom absolute>reset</v-btn>
              <v-btn class="ma-1" color="primary" @click="submit" right bottom absolute>save</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
    </v-row>

    <v-snackbar
      v-model="snackbar"
      :color="color"
      class="tips"
      light
      :timeout="timeout"
      centered
      top
      absolute
    >
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbar = false">Close</v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userTagEditor",
  data: () => ({
    model: null,
    name: "",
    displayName: "",
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
    ...mapGetters(["tag", "user"]),
    tags() {
      return this.tag;
    },
    isValid() {
      return this.$refs.form.validate();
    },
  },
  async mounted() {
    await this.$store.dispatch("getUserInfo");
    await this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
  },
  methods: {
    clear() {
      if (this.name && this.displayName && this.description) {
        this.name = "";
        this.displayName = "";
        this.description = "";
      }
    },
    async submit() {
      if (!this.$refs.tagForm.validate()) {
        this.text = "Please fill in.";
        this.color = this.error;
        this.snackbar = true;
        return;
      }
      let tagBody = {
        name: this.name,
        displayName: this.displayName,
        description: this.description,
        submitterId: this.user.uId,
        submitter: this.user.username,
      };
      let isRedirect = false;
      await this.$store
        .dispatch("postTag", tagBody)
        .then(() => {
          this.text = "Save tag successfully.";
          this.color = this.success;
          this.snackbar = true;
          isRedirect = true;
        })
        .catch((err) => {
          console.log(err);
          this.text = "Save tag unsuccessfully." + err.msg;
          this.color = this.error;
          this.snackbar = true;
        });
      if (isRedirect) {
        this.$router.push({
          path: "/",
        });
        return;
      }
      this.name = "";
      this.displayName = "";
      this.description = "";
    },
  },
};
</script>

<style scope lang="scss" scope>
.inputarea {
  height: 50vh;
}
.mx-auto {
  width: 70%;
  z-index: 1501;
}
.tagcard {
  width: 80vw;
  z-index: 1501;
}
.input-tag-name {
  z-index: 1501;
}
.input-tag-display-name {
  z-index: 1501;
}
.input-tag-description {
  z-index: 1501;
}
.tips {
  z-index: 2000;
}
</style>