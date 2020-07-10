<template>
  <v-app>
    <core-app-bar />
    <core-view />
    <core-drawer />
    <core-footer />
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {
    // CoreNavigation: () => import("@/components/core/Navigation"),
    CoreDrawer: () => import("@/components/core/Drawer"),
    CoreFooter: () => import("@/components/core/Footer"),
    CoreAppBar: () => import("@/components/core/AppBar"),
    CoreView: () => import("@/components/core/View")
  }
};
</script>
