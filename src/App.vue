<template>
  <v-fade-transition mode="out-in">
    <v-app>
      <core-app-bar />
      <core-view />
      <!-- <core-drawer /> -->
      <core-footer />
    </v-app>
  </v-fade-transition>
</template>

<script>
// Mixins
import Meta from "@/mixins/meta";

export default {
  name: "App",
  mixins: [Meta],
  components: {
    // CoreDrawer: () => import("@/components/core/Drawer"),
    CoreAppBar: () => import("@/components/core/AppBar"),
    CoreView: () => import("@/components/core/View"),
    CoreFooter: () => import("@/components/core/Footer"),
  },
};
</script>

<style lang="scss" scoped>
.text-decoration-none {
  text-decoration: none;
}

.wf-loading .material-icons {
  display: none;
}

.v-application .markdown code {
  box-shadow: none;
  color: #fbe5e1;
  background-color: #fbe5e1;
}

.v-application .markdown kbd > code {
  background: transparent;
  color: inherit;
}
</style>
