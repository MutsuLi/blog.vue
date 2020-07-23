<template>
  <section id="content">
    <base-text>
      <slot />
    </base-text>
  </section>
</template>

<script>
export default {
  name: "ArticleContent",
  mounted() {
    this.$store.dispatch("getContentDetail");
  },
  components: {
    BaseTitle: () => import("../base/Title"),
    BaseText: () => import("./Text")
  }
};
</script>
