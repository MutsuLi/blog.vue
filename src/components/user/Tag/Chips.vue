   <template>
  <v-container>
    <v-card class="tagcard">
      <v-row justify="center">
        <v-col cols="12" sm="10" md="8" lg="6">
          <p class="display-1 text--primary" align="center">Latest Tags</p>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row justify="center" align="center">
        <v-chip-group column active-class="deep-purple--text text--accent">
          <v-chip
            v-for="item in tags"
            :key="item.id"
            :value="item.name"
            outlined
            pill
            tag
          >{{ item.name }}</v-chip>
        </v-chip-group>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "userTagChips",
  data: () => ({
    model: null,
    name: "",
    displayName: "",
    desc: "",
    text: "",
    color: "",
    search: "",
    description: "",
    timeout: 5000,
    error: "red lighten-3",
    success: "green lighten-3",
    snackbar: false,
    nameRules: [(v) => !!v || "tag name is required"],
    isLoading: false,
  }),
  components: {},
  computed: {
    ...mapGetters(["tag", "user"]),
    tags() {
      return this.tag;
    },
    isValid() {
      return this.$refs.form.validate();
    },
  },
  async mounted() {
    await this.$store.dispatch("getUserInfo");
    await this.$store.dispatch("getTagList", { page: 1, pageSize: 25 });
  },
  methods: {
    async submit() {
      if (!this.$refs.tagForm.validate()) {
        this.text = "Please fill in.";
        this.color = this.error;
        this.snackbar = true;
        return;
      }
      let tagBody = {
        name: this.name,
        displayName: this.displayName,
        description: this.description,
        submitterId: this.user.uId,
        submitter: this.user.username,
      };
      console.log(this.user);
      await this.$store
        .dispatch("postTag", tagBody)
        .then(() => {
          this.text = "Save tag successfully.";
          this.color = this.success;
          this.snackbar = true;
        })
        .catch((err) => {
          console.log(err);
          this.text = "Save tag unsuccessfully." + err.msg;
          this.color = this.error;
          this.snackbar = true;
        });
    },
  },
};
</script>

<style scope lang="scss">
.inputarea {
  height: 50vh;
}
.mx-auto {
  width: 70%;
  z-index: 1501;
}
.tagcard {
  width: 80vw;
  z-index: 1501;
}
.input-tag-name {
  z-index: 1501;
}
.input-tag-display-name {
  z-index: 1501;
}
.input-tag-description {
  z-index: 1501;
}
.tips {
  z-index: 2000;
}
</style>