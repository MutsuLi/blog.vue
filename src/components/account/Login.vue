<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-img src="https://picsum.photos/510/300?random" aspect-ratio="2"></v-img>
        <p class="display-1 text--primary" align="center">Sign to MutsuLi's Blog</p>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card ref="form">
          <v-card-text>
            <v-text-field
              v-model="username"
              :rules="nameRules"
              label="UserName"
              required
              outlined
              rounded
            ></v-text-field>
            <v-text-field
              v-model="password"
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
          </v-card-text>
          <v-divider class="mt-12"></v-divider>
          <v-card-actions>
            <v-btn :disabled="!valid" x-large block color="primary" @click="submit">Sign in</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-text class align="center">
            New to GitHub?
            <a href="/join">Create an account.</a>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "AccountLogin",
  components: {
    BaseVuetifyLogo: () => import("../base/VuetifyLogo"),
  },
  data: () => ({
    show: false,
    valid: true,
    username: "",
    password: "",
    nameRules: [
      (v) => !!v || "Name or E-mail is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 12) || "Password must be at least 12 characters",
    ],
  }),

  methods: {
    submit() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
</style>