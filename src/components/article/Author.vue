 <template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item>
      <v-list-item-avatar color="grey" size="48"></v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title class="headline">{{author.name}}</v-list-item-title>
        <v-list-item-subtitle>{{author.title}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-card-text>
      <v-row></v-row>
      <p>文章: {{author.count}}</p>
      <div class="text--primary">{{author.info}}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4">Learn More</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "ArticleAuthor",
  data: () => ({
    author: {
      name: "mutsuli",
      title: "software engineer",
      info: "someone like you",
      count: 10,
    },
  }),
  async mounted() {
    await this.$store.dispatch("getUserInfo");
  },
  computed: {},
};
</script>