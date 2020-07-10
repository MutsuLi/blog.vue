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
    <!-- <v-btn
          v-for="(menu, i) in menus"
          :key="i"
          v-bind="menu"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, menu)"
    >{{ menu.name }}</v-btn>-->
    <!-- <v-menu right bottom offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>

          <v-list>
            <v-list-item v-for="n in 5" :key="n" @click="() => {}">
              <v-list-item-title>Option {{ n }}</v-list-item-title>
            </v-list-item>
          </v-list>
    </v-menu>-->
    <!-- <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
    />-->
    <!-- </v-row> -->

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
    BaseVuetifyLogo: () => import("../base/VuetifyLogo")
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

