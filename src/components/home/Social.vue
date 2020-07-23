<template>
  <v-container id="social" tag="section">
    <v-row>
      <v-col cols="12" md="4">
        <tags />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HomeSocial",

  components: {
    Instagram: () => import("@/components/home/Instagram"),
    Tags: () => import("@/components/home/Tags"),
  },
};
</script>
