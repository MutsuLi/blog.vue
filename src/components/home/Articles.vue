<template>
  <section id="feed">
    <feed>
      <slot />
    </feed>
  </section>
</template>

<script>
  export default {
    name: 'HomeAbout',
    mounted() {
      this.$store.dispatch("getContentRows");
    },
    components: {
      Feed: () => import('@/components/home/Feed'),
    },
  }
</script>
