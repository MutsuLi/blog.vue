<template>
  <v-container class="mx-auto">
    <v-row justify="center" class="inputarea">
      <v-card class="tagcard">
        <v-card-title>
          <p class="display-1 text--primary" align="center">Profile</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="tagForm">
          <v-card-text class="ma-1">
            <v-text-field
              class="input-name"
              ref="name"
              v-model="userinfo.name"
              :value="userinfo.name"
              hint="Your name may be used to login your account."
              disabled
              label="name"
              outlined
            ></v-text-field>
            <v-text-field
              class="input-email"
              ref="email"
              hint="Your email may be used to login your account and receving verifying email."
              v-model="userinfo.userid"
              :value="userinfo.userid"
              label="email"
              outlined
            ></v-text-field>
            <v-text-field
              class="input-title"
              ref="title"
              v-model="userinfo.title"
              :value="userinfo.title"
              validate-on-blur
              :rules="nameRules"
              hint="Update you user title."
              label="title"
              required
              outlined
            ></v-text-field>
            <v-textarea
              class="input-description"
              ref="description"
              v-model="user.description"
              :value="userinfo.description"
              validate-on-blur
              :rules="nameRules"
              hint="Update you user description."
              label="description"
              required
              outlined
              rounded
            ></v-textarea>
            <v-card-actions>
              <v-btn class="ma-1 white--text" color="green" @click="editInfo">update profile</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-row>

    <v-divider></v-divider>
    <v-snackbar
      v-model="snackbar"
      centered
      absolute
      app
      :color="color"
      class="tips"
      light
      :timeout="timeout"
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
  name: "userSettingProfile",
  data: () => ({
    show: false,
    model: null,
    color: "",
    text: "",
    password: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    nameRules: [(v) => !!v || "User name is required"],
    isLoading: false,
  }),
  components: {},
  computed: {
    ...mapGetters(["user"]),
    isValid() {
      return this.$refs.form.validate();
    },
    userinfo() {
      return this.user;
    },
  },
  methods: {
    async editInfo() {
      if (!this.$refs.tagForm.validate()) {
        this.text = "Please fill in.";
        this.color = this.error;
        this.snackbar = true;
        return;
      }
      let userInfo = {
        uId: this.user.uId,
        uEmail: this.user.userid,
        uName: this.user.username,
        uTitle: this.user.title,
        uDescription: this.user.description,
      };
      console.log("user");
      console.log(this.user);
      await this.$store
        .dispatch("updateUserInfo", userInfo)
        .then(() => {
          this.text = "Save user info successfully.";
          this.color = this.success;
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
          this.text = "Save user info unsuccessfully." + err.msg;
          this.color = this.error;
          this.snackbar = true;
        });
    },
  },
};
</script>

<style scope lang="scss">
.inputarea {
  height: 100vh;
}
.mx-auto {
  width: 70%;
  z-index: 1501;
}
.tagcard {
  width: 80vw;
  z-index: 1501;
}
.input-name {
  width: 40%;
  z-index: 1501;
}
.input-email {
  width: 40%;
  z-index: 1501;
}
.input-title {
  width: 40%;
  z-index: 1501;
}
.input-description {
  width: 80%;
  z-index: 1501;
}
.title {
  width: 80%;
  z-index: 1501;
}
.tips {
  z-index: 2000;
}
</style>