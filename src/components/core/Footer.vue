<template>
  <div class="ma-1 pa-1">
    <v-container fluid>
      <v-footer padless clipped-left clipped-right flat>
        <v-spacer></v-spacer>
        <v-container>
          <v-row justify="center">
            <v-col
              class="text-center"
              cols="9"
            >Powered by .NET Core 3.1.4 © mutsuli {{ new Date().getFullYear() }}</v-col>
            <base-btn class="mr-0" square title="Go to top" @click="$vuetify.goTo(0)">
              <v-icon>mdi-chevron-up</v-icon>
            </base-btn>
          </v-row>
        </v-container>
      </v-footer>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "CoreFooter",

  data: () => ({
    items: [
      {
        href: "#!",
        icon: "mdi-twitter"
      },
      {
        href: "#!",
        icon: "mdi-instagram"
      },
      {
        href: "#!",
        icon: "mdi-facebook"
      },
      {
        href: "#!",
        icon: "mdi-google-plus"
      },
      {
        href: "#!",
        icon: "mdi-reddit"
      },
      {
        href: "#!",
        icon: "mdi-discord"
      },
      {
        href: "#!",
        icon: "mdi-pinterest"
      }
    ]
  })
};
</script>
