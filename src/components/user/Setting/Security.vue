<template>
  <v-container class="mx-auto">
    <v-row justify="center" class="inputarea">
      <v-card class="tagcard">
        <v-card-title>
          <p class="display-1 text--primary" align="center">Change password</p>
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="tagForm">
          <v-card-text>
            <v-text-field
              ref="oldpassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              label="old password"
              class="input-password"
              validate-on-blur
              :rules="oldpasswordRules"
              @click:append="show = !show"
              required
              outlined
              rounded
            ></v-text-field>
            <v-text-field
              ref="newpassword"
              v-model="password"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              validate-on-blur
              label="new password"
              class="input-password"
              :rules="newpasswordRules"
              @click:append="show = !show"
              required
              outlined
              rounded
            ></v-text-field>
            <v-text-field
              ref="confirmpassword"
              v-model="confirmpassword"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              validate-on-blur
              label="confirm new password"
              class="input-password"
              :rules="checkPassword"
              @click:append="show = !show"
              required
              outlined
              rounded
            ></v-text-field>
            <v-card-actions>
              <v-btn class="ma-1 white--text" color="green" @click="editPassword">update password</v-btn>
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
  name: "userSettingAccount",
  data: () => ({
    show: false,
    model: null,
    color: "",
    text: "",
    password: "",
    confirmpassword: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    newpasswordRules: [(v) => !!v || "New password is required"],
    oldpasswordRules: [(v) => !!v || "old password is required."],
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
    checkPassword() {
      let rules = [];
      if (this.confirmpassword != "" && this.password != "") {
        const rule = (v) =>
          (v || "") == this.password ||
          `New password and confirm password is not equal.`;
        rules.push(rule);
      }
      return rules;
    },
  },
  methods: {
    async editPassword() {
      let valid =
        this.$refs.newpassword.validate() &&
        this.$refs.oldpassword.validate() &&
        this.$refs.confirmpassword.validate();
      if (!valid) {
        this.text =
          "Old password , New password and confirm password is necessary.";
        this.color = this.error;
        this.snackbar = true;
        return;
      }
      let userInfo = {
        uId: this.user.uId,
        uPassword: this.password,
      };
      await this.$store
        .dispatch("updateUserInfo", userInfo)
        .then(() => {
          this.text = "Change user info successfully.";
          this.color = this.success;
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
          this.text =
            "Change password unsuccessfully. Check your old password" + err.msg;
          this.color = this.error;
          this.snackbar = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
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
.input-password {
  width: 40%;
  z-index: 1501;
}
.tips {
  z-index: 2000;
}
</style>