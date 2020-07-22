<template>
  <v-btn class="hidden-md-and-down" min-width="48" text :to="path" style="min-width: 48px">
    <v-icon class="hidden-sm-and-down" middle>mdi-home-circle</v-icon>
    <div>Home</div>
  </v-btn>
</template>

<script>
export default {
  name: "BaseHomepage",
  computed: {
    path() {
      return {
        path: `/`
      };
    }
  }
};
</script>
