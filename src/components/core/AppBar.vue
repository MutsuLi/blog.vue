<template>
  <v-app-bar id="core-app-bar" app clipped-left clipped-right flat>
    <v-spacer />
    <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />

    <base-vuetify-logo />
    <base-navigation-menu />

    <home-search />
    <base-Login-menu />
    <v-spacer class="d-sm-none" />
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoreAppBar",
  inject: ["theme"],
  components: {
    BaseVuetifyLogo: () => import("../base/VuetifyLogo"),
    HomeSearch: () => import("../home/Search"),
    BaseSupportMenu: () => import("../base/SupportMenu"),
    BaseNavigationMenu: () => import("../base/NavigationMenu"),
    BaseLoginMenu: () => import("../base/LoginMenu"),
  },
  computed: {
    ...mapGetters(["menus"]),
  },
  mounted() {
    this.$store.dispatch("getMenuList");
  },
  methods: {
    ...mapMutations(["toggleDrawer"]),
    onClick(e, item) {
      e.stopPropagation();
      if (item.to || !item.href) return;
      this.$vuetify.goTo(item.href.endsWith("!") ? 0 : item.href);
    },
  },
};
</script>

<style lang="scss" scoped>
#core-app-bar {
  z-index: 1502;
  border-width: 0 0 thin 0;
  border-style: solid;
}
.theme--light {
  border-bottom-color: #0000001f !important;
}

.theme--dark {
  border-bottom-color: #ffffff1f !important;
}
</style>

