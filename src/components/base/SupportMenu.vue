<template>
  <v-menu bottom right max-height="calc(100% - 16px)" offset-y transition="slide-y-transition">
    <template v-slot:activator="{ on: menu }">
      <v-btn
        :aria-label="'Vuetify.AppToolbar.support'"
        class="hidden-md-and-down"
        text
        style="min-width: 48px"
        v-on="menu"
      >
        <v-icon class="hidden-sm-and-down" middle>mdi-dots-horizontal</v-icon>
      </v-btn>
    </template>

    <v-list dense nav>
      <!-- <v-subheader v-text="'Vuetify.AppToolbar.getHelp'" /> -->
      <base-item
        v-for="support in supports"
        :key="support.text"
        v-bind="support"
        no-markdown
        @click="$ga.event('toolbar', 'click', 'support', support.text)"
      />
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "BaseSupportMenu",
  data: (vm) => ({
    supports: [
      {
        href: "/",
        icon: "mdi-information",
        text: "About",
        blank: false,
      },
      {
        href: "https://github.com/okitasann",
        icon: "mdi-git",
        text: "Github",
        blank: true,
      },
    ],
  }),
};
</script>
