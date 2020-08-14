<template>
  <v-container class="pa-0">
    <v-card outlined>
      <v-card-title>Hottest Blog</v-card-title>
      <v-divider />
      <v-list>
        <v-list-item-group color="primary">
          <v-list-item v-for="(rank,i) in ranksList" :key="i" align="center">
            <v-list-item-content>
              <v-list-item-subtitle
                v-text="rank.title"
                dense
                nav
                subheader
                @click="redirect(rank)"
              >{{rank.title}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
// Utilities
import { mapGetters } from "vuex";

export default {
  name: "DrawerRank",
  computed: {
    ...mapGetters(["ranks", "user"]),
    ranksList() {
      return this.ranks;
    },
  },
  methods: {
    redirect(value) {
      this.$router.push({
        path: value.href,
        query: { uId: value.uId },
      });
    },
  },
};
</script>
