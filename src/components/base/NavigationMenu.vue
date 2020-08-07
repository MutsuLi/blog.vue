<template >
  <v-row align="center">
    <v-btn
      class="hidden-md-and-down"
      v-for="(menu,i) in menus"
      :key="i"
      :item="menu"
      :href="menu.href"
      min-width="48"
      text
      style="min-width: 48px color:primary"
      @click="onClick($event, menu)"
    >
      <v-icon class="hidden-sm-and-down" middle>{{menu.icon}}</v-icon>
      <div>{{menu.name}}</div>
    </v-btn>
    <base-support-menu />
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "BaseNavigationMenu",
  mounted() {
    this.$store.dispatch("getMenuList");
  },
  components: {
    BaseSupportMenu: () => import("../base/SupportMenu"),
  },
  computed: {
    ...mapGetters(["menus"]),
  },
};
</script>
