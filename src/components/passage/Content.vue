<template>
  <section id="content">
    <base-text>{{content}}</base-text>
  </section>
</template>

<script>
export default {
  name: "PassageContent",
  mounted() {
    this.$store.dispatch("getContentDetail");
  },
  computed: {
    ...mapGetters(["passages"]),
  },
  components: {
    BaseTitle: () => import("../base/Title"),
    BaseText: () => import("../base/Text")
    //   DocumentationBreadcrumbs: () => import('./Breadcrumbs'),
    //   DocumentationContribution: () => import('./Contribution'),
  }
};
</script>
