<template>
  <section id="feed">
    <feed>
      <slot />
    </feed>
  </section>
</template>

<script>
export default {
  name: "HomeAbout",
  mounted() {
    this.$store.dispatch("getContentRows", { page: 1, pageSize: 11 });
  },
  components: {
    Feed: () => import("@/components/home/Feed"),
  },
};
</script>
