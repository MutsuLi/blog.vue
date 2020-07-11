<template>
  <div id="home">
    <articles>
      <HomeCarousels/>
      <banner />
    </articles>
    <!-- <about />-->
    <social /> 
    <core-footer/>   
  </div>
</template>

<script>
export default {
  name: "Home",

  components: {
    HomeCarousels: () => import("@/components/home/Carousels"),
    // About: () => import('@/components/home/About'),
    Articles: () => import("@/components/home/Articles"),
    Banner: () => import("@/components/home/Banner"),
    Social: () => import("@/components/home/Social"),
    CoreFooter: () => import("@/components/core/Footer")
  }
};
</script>
