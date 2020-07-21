<template>
  <v-app-bar
    id="core-app-bar"
    :color="!theme.isDark ? 'white' : undefined"
    app
    clipped-left
    clipped-right
    flat
  >
    <v-app-bar-nav-icon class="hidden-lg-and-up" @click="drawer = !drawer" />

    <base-vuetify-logo />
    <v-spacer />
    <home-search />

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
    HomeSearch: () => import("../home/Search")
  },
  computed: {
    ...mapGetters(["menus"])
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
    }
  }
};
</script>

<style lang="sass">
.theme--light,
.theme--dark
  #core-app-bar
    border-width: 0 0 thin 0
    border-style: solid

    &.theme--light
      border-bottom-color: #0000001F !important

      &.theme--dark
        border-bottom-color: #FFFFFF1F !important
</style>

