<template>
  <account-Login></account-Login>
</template>

<script>
export default {
  name: "Login",
  components: {
    AccountLogin: () => import("@/components/account/Login"),
  },
};
</script>