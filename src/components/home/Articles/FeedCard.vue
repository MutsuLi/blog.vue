<template>
  <v-col cols="12" :md="size === 2 ? 6 : size === 3 ? 4 : undefined">
    <v-hover v-slot:default="{ hover }">
      <v-card
        :height="value.prominent ? 450 : 350"
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
        outlined
        @click="showDetail(value)"
      >
        <!-- <v-img
          :src="require(`@/assets/articles/${value.hero}`)"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >-->
        <v-row v-if="!value.prominent" class="fill-height text-right ma-0">
          <v-col cols="12">
            <v-card-title class="title font-weight-bold mb-2" text-color="black">{{ value.title }}</v-card-title>
            <v-card-text
              class="text--primary ma-0 body-1 font-weight-bold text-left"
            >{{ value.remark }}</v-card-text>
            <v-card-text class="text--primary font-weight-bold text-left" text-color="black">
              <span class="pr-2">
                <v-icon>mdi-account-box</v-icon>
                {{ value.uName }}
              </span>
              <span class="pr-2">
                <v-icon>mdi-clock-outline</v-icon>
                {{ value.createTime }}
              </span>
              <span class="pr-2">
                <v-icon>mdi-clock-outline</v-icon>
                {{ value.updateTime }}
              </span>
              <span class="pr-2">
                <v-icon>mdi-eye</v-icon>
                {{ value.traffic }}
              </span>
            </v-card-text>
            <v-spacer />
            <v-card-actions>
              <v-chip
                label
                class="mx-0 mb-2 text-uppercase"
                color="blue"
                text-color="white"
                small
                @click.stop
              >{{ value.category }}</v-chip>
            </v-card-actions>
          </v-col>
        </v-row>
        <!-- </v-img> -->
      </v-card>
    </v-hover>
  </v-col>
</template>

<script>
export default {
  name: "FeedCard",
  components: {
    BaseMarkdown: () => import("@/components/base/Markdown"),
  },
  props: {
    size: {
      type: Number,
      required: true,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    showDetail(value) {
      this.$router.push({
        path: value.href,
        query: { uId: value.uId },
      });
    },
  },
};
</script>

<style>
/* .v-image__image {
  transition: 0.3s linear;
} */
.v-card {
  transition: opacity 0.4s ease-in-out;
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
