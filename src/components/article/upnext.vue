<template>
  <v-row class="ma-3">
    <v-col v-for="(link, i) in links" :key="i" cols="12" md="6">
      <v-card outlined>
        <base-item
          :to="link.link"
          :avatar="link.icon"
          :avatar-color="link.color"
          :text="link.target"
          :subtext="link.section"
          no-markdown
          @click.native="$ga.event('up-next', 'click', link.target, $route.path)"
        >
          <v-list-item-action>
            <v-icon>mdi-arrow-left</v-icon>
          </v-list-item-action>
        </base-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ArticleUpNext",
  computed: {
    ...mapGetters(["article"]),
    links() {
      let links = [];
      if (this.article && this.article.previousID) {
        links.push({
          link: "/articles/" + this.article.previousID,
          target: this.article.previous,
        });
      }
      if (this.article && this.article.nextID) {
        links.push({
          link: "/articles/" + this.article.nextID,
          target: this.article.next,
        });
      }
      return links;
    },
  },

  methods: {},
};
</script>
