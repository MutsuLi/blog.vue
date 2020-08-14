 <template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item>
      <v-list-item-avatar color="grey" size="48"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{author.username}}</v-list-item-title>
        <v-list-item-subtitle>{{author.title}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row></v-row>
      <div class="text--primary">{{author.description}}</div>
    </v-card-text>
    <!-- <v-card-actions>
      <v-btn text color="deep-purple accent-4">Learn More</v-btn>
    </v-card-actions> -->
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ArticleAuthor",
  mounted() {},
  computed: {
    ...mapGetters(["article", "author"]),
    async Author() {
      // if (this.article.uId) {
      //   await this.$store.dispatch("getUserInfoById", {
      //     uId: this.article.uId,
      //   });
      // }
      return this.author;
    },
  },
};
</script>