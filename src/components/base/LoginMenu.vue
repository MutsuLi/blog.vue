<template>
  <v-row align="center">
    <v-btn
      v-if="!isLogin"
      class="hidden-md-and-down"
      min-width="48"
      href="/login"
      text
      style="min-width: 48px color:primary"
      @click="onClick($event, menu)"
    >
      <div>Sign in</div>
    </v-btn>
    <v-btn
      v-if="!isLogin"
      class="hidden-md-and-down"
      min-width="48"
      href="/join"
      text
      style="min-width: 48px color:primary"
      @click="onClick($event, menu)"
    >
      <div>Sign up</div>
    </v-btn>
    <v-menu
      v-if="isLogin"
      bottom
      left
      max-height="calc(100% - 32px)"
      offset-y
      transition="slide-y-transition"
    >
      <template v-slot:activator="{ on: menu }">
        <v-btn
          :aria-label="'Vuetify.AppToolbar.support'"
          class="hidden-md-and-down"
          text
          style="min-width: 48px"
          v-on="menu"
        >
          <v-avatar>
            <v-icon>mdi-account-circle</v-icon>
          </v-avatar>
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>
      <v-list dense nav>
        <!-- <v-subheader v-text="'Vuetify.AppToolbar.getHelp'" /> -->
        <base-item
          v-for="each in userMenu"
          :key="each.text"
          :href="each.href"
          v-bind="each"
          no-markdown
          @click="$ga.event('toolbar', 'click', 'each', each.text)"
        />
      </v-list>
    </v-menu>
  </v-row>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "BaseLoginMenu",
  data: () => ({
    userMenu: [
      // {
      //   href: "/",
      //   icon: "mdi-home-account",
      //   text: "My Page",
      // },
      {
        href: "/write",
        to: "write",
        icon: "mdi-lead-pencil",
        text: "write",
        blank: false,
      },
      // {
      //   href: "/",
      //   icon: "mdi-file-edit-outline",
      //   text: "My Aritcle",
      // },
      // {
      //   href: "/",
      //   icon: "mdi-cogs",
      //   text: "Setting",
      // },
      {
        href: "/",
        to: "",
        icon: "mdi-power",
        text: "Sign Out",
        blank: false,
      },
    ],
  }),
  computed: {
    ...mapGetters(["user","token"]),
    isLogin() {
      return this.token;
    },
  },
};
</script>
