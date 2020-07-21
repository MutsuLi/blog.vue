<template>
  <v-app>
    <articles>
      <HomeCarousels />
      <banner />
    </articles>
    <!-- <about />-->
    <social />
  </v-app>
</template>

<script>
export default {
  name: "Home",

  components: {
    HomeCarousels: () => import("@/components/home/Carousels"),
    // About: () => import('@/components/home/About'),
    Articles: () => import("@/components/home/Articles"),
    Banner: () => import("@/components/home/Banner"),
    Social: () => import("@/components/home/Social")
    //CoreFooter: () => import("@/components/core/Footer")
  }
};
</script>

<style lang="sass">
.text-decoration-none
  text-decoration: none

  .wf-loading .material-icons
    display: none

  .v-application .markdown code
    box-shadow: none
    color: #c0341d
    background-color: #fbe5e1

  .v-application .markdown kbd > code
    background: transparent
    color: inherit
</style>
