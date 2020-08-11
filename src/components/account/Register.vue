<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <p class="display-1 text--primary" align="center">Create your account</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-form ref="registerForm">
          <v-card>
            <v-card-text>
              <!-- <v-form ref="form" v-model="valid" lazy-validation> -->
              <v-text-field
                v-model="fields.username"
                :rules="nameRules"
                label="UserName"
                required
                outlined
                rounded
              ></v-text-field>
              <v-text-field
                v-model="fields.userid"
                :rules="emailRules"
                label="E-mail"
                required
                outlined
                rounded
              ></v-text-field>
              <v-text-field
                v-model="fields.password"
                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show ? 'text' : 'password'"
                :rules="passwordRules"
                name="input-10-2"
                label="Password"
                class="input-group--focused"
                @click:append="show = !show"
                required
                outlined
                rounded
              ></v-text-field>
              <!-- <v-text-field
            v-model="Captcha"
            :rules="Captcha"
            label="E-mail"
            required
            outlined
            rounded
              ></v-text-field>-->
            </v-card-text>
            <v-divider class="mt-12"></v-divider>
            <v-card-actions>
              <v-btn
                :disabled="!valid"
                x-large
                block
                color="primary"
                @click="register"
              >Create account</v-btn>
            </v-card-actions>
          </v-card>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AccountRegister",
  data: () => ({
    valid: true,
    show: false,
    fields: {
      userid: "",
      username: "",
      password: "",
    },
    nameRules: [
      (v) => !!v || "UserName is required",
      (v) =>
        (v && v.length <= 10) || "UserName must be less than 10 characters",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 6) || "Password must be at least 6 characters",
    ],

    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
  }),

  methods: {
    async register() {
      let valid = this.$refs.registerForm.validate();
      const params = {
        userid: this.fields.userid,
        username: this.fields.username,
        password: this.fields.password,
      };
      if (valid) {
        await this.$store.dispatch("register", params).catch((err) => {
          console.log(err + "register fail");
        });
        this.$router.push({
          path: "/login",
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    },
  },
};
</script>

<style>
</style>