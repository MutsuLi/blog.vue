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
        <v-form ref="loginForm">
          <v-card>
            <v-card-text>
              <v-text-field
                v-model="fields.userid"
                :rules="useridRules"
                label="userid"
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
                label="password"
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
        </v-form>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card>
          <v-card-text class align="center">
            New to MutsuLi's Blog?
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
    fields: {
      userid: "",
      password: "",
    },
    useridRules: [
      (v) => !!v || "Name or E-mail is required",
      (v) => (v && v.length >= 4) || "Name must be at least 4 characters",
    ],
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => (v && v.length >= 4) || "Password must be at least 4 characters",
    ],
    redirect: undefined,
    otherQuery: {},
  }),
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true,
    },
  },
  methods: {
    async submit() {
      let valid = this.$refs.loginForm.validate();
      const fields = this.fields;
      if (valid) {
        await this.$store.dispatch("getToken", fields).catch((err) => {
          console.log(err + "login fail");
        });
        this.$router.push({
          path: this.redirect || "/",
          query: this.otherQuery,
        });
      } else {
        console.log("error submit!!");
        return false;
      }
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    },
  },
};
</script>

<style>
</style>