<template>
  <v-menu bottom left max-height="calc(100% - 16px)" offset-y transition="slide-y-transition">
    <template v-slot:activator="{ on: menu }">
      <v-btn
        :aria-label="'Vuetify.AppToolbar.support'"
        class="hidden-md-and-down"
        text
        style="min-width: 48px"
        v-on="menu"
      >
        <base-nav-text class="hidden-sm-and-down">About</base-nav-text>

        <v-icon class="hidden-sm-and-down" right>mdi-menu-down</v-icon>

        <v-icon class="hidden-md-and-up">mdi-comment-question</v-icon>
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

  data: vm => ({
    supports: [
      {
        href: "/",
        icon: "mdi-information",
        text: "about"
      },
      {
        href: "https://github.com/okitasann",
        icon: "mdi-git",
        text: "Github"
      }
    ]
  })
};
</script>
