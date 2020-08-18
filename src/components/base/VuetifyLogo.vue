<template>
  <router-link
    :to="{
      name: 'Home',
      params: {
        lang: $route.params.lang
      }
    }"
    aria-label="Vuetify Home Page"
    class="d-none d-sm-flex align-center text--primary"
    style="text-decoration: none;"
    title="Vuetify Home Page"
    @click.native="$vuetify.goTo(0)"
  >
    <v-icon large>mdi-book-open</v-icon>

    <v-sheet
      class="display-1 hidden-sm-and-down font-weight-medium mr-0 mr-md-4"
      color="transparent"
    >MutsuLi</v-sheet>
  </router-link>
</template>

<script>
export default {
  name: "BaseVuetifyLogo",

  inject: ["theme"],
};
</script>


