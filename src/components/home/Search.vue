<template>
  <v-responsive class="transition-swing mt-6 mr-4 hidden-sm-and-down">
    <v-autocomplete
      id="doc-search"
      ref="search"
      class="search"
      v-model="model"
      :items="this.articleSearch"
      item-text="text"
      item-value="value"
      :loading="isLoading"
      @keyup.enter="redirectPage"
      :search-input.sync="search"
      :background-color="!theme.isDark ? 'grey lighten-3' : undefined"
      hide-no-data
      hide-selected
      placeholder="Start typing to Search"
      prepend-icon="mdi-magnify"
      allow-overflow
      clearable
      dense
      flat
      solo-inverted
      clear-icon="mdi-close-circle"
      return-object
    ></v-autocomplete>
  </v-responsive>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeSearch",
  inject: ["theme"],
  data: () => ({
    docSearch: {},
    isFocused: false,
    isLoading: false,
    label: 'Search ("/" to focus)',
    search: "",
    timeout: null,
    model: null,
  }),
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  computed: {
    ...mapGetters(["articleSearch"]),
    fields() {
      if (!this.model) return [];
      return Object.keys(this.model).map((key) => {
        return {
          key,
          value: this.model[key] || "n/a",
        };
      });
    },
  },
  methods: {
    querySelections(val) {
      if (this.isLoading) return;
      this.isLoading = true;
      this.$store
        .dispatch("getSearchRows", {
          page: 1,
          pageSize: 25,
          key: val,
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    redirectPage() {
      this.$router.push({
        path: this.$refs.search.internalValue.value,
      });
    },
  },
};
</script>

<style lang="scss">
.algolia-autocomplete {
  flex: 1 1 auto;
  position: fixed !important;
}

#search {
  width: 100%;
}

// .search {
//   flex: 1 1 auto;
//   // position: sticky !important;
//   margin: 0;
// }

.algolia-autocomplete a {
  text-decoration: none !important;
}

:before {
  display: none;
}
:after {
  display: none;
}
</style>
