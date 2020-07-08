<template>
  <v-app-bar app flat>
    <v-app-bar-nav-icon class="hidden-md-and-up" @click="toggleDrawer" />

    <v-container class="mx-auto py-0">
      <v-row align="center">
        <v-img
          :src="require('@/assets/logo.png')"
          class="mr-5"
          contain
          height="48"
          width="48"
          max-width="48"
          @click="$vuetify.goTo(0)"
        />

        <v-btn
          v-for="(link, i) in tags"
          :key="i"
          v-bind="link"
          class="hidden-sm-and-down"
          text
          @click="onClick($event, link)"
        >{{ link.text }}</v-btn>
        <v-menu right bottom  offset-y>
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
        </v-menu>
        <!-- <v-text-field
          append-icon="mdi-magnify"
          flat
          hide-details
          solo-inverted
          style="max-width: 300px;"
        />-->
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
// Utilities
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "CoreAppBar",

  computed: {
    ...mapGetters(["tags"])
  },
  mounted() {
    this.$store.dispatch('getContentRows')
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
