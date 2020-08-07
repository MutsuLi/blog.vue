<template>
  <section id="content">
    <base-text>
      <slot />
    </base-text>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ArticleContent",
  mounted() {
    this.$store.dispatch("getAritcileDetail", {
      bID: this.$route.params.bID,
      token: this.token,
    });
  },
  watch: {
    $route(to, from) {
      this.$router.go(0);
    },
  },
  computed: {
    ...mapGetters(["token"]),
  },
  components: {
    BaseTitle: () => import("../base/Title"),
    BaseText: () => import("./Text"),
  },
};
</script>
