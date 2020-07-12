<template>
  <div id="Passage">
    <passageContent />
    <PassageFab />
    <passageToc />
  </div>
</template>

<script>
export default {
  name: "Passage",
  components: {
    PassageFab: () => import("@/components/passage/Fab"),
    passageContent: () => import("@/components/passage/Content"),
    passageToc: () => import("@/components/passage/Toc")
  }
};
</script>
