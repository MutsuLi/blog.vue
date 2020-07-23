<template>
  <div id="Article">
    <article-content />
    <article-fab />
    <article-toc />
  </div>
</template>

<script>
export default {
  name: "Article",
  components: {
    ArticleFab: () => import("@/components/article/Fab"),
    ArticleContent: () => import("@/components/article/Content"),
    ArticleToc: () => import("@/components/article/Toc")
  }
};
</script>
