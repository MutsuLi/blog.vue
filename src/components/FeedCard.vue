<template>
  <v-col cols="12" :md="size === 2 ? 6 : size === 3 ? 4 : undefined">
    <v-hover v-slot:default="{ hover }">
      <v-card
        :height="value.prominent ? 450 : 350"
        :elevation="hover ? 12 : 2"
        :class="{ 'on-hover': hover }"
        href="#!"
      >
        <!-- <v-img
          :src="require(`@/assets/articles/${value.hero}`)"
          height="100%"
          gradient="rgba(0, 0, 0, .42), rgba(0, 0, 0, .42)"
        >-->
        <v-row v-if="!value.prominent" class="fill-height text-right ma-0">
          <v-col cols="12">
            <v-chip
              label
              class="mx-0 mb-2 text-uppercase"
              color="blue"
              text-color="white"
              small
              @click.stop
            >{{ value.category }}</v-chip>

            <h3 class="title font-weight-bold mb-2" text-color="black">{{ value.title }}</h3>

            <div class="caption" text-color="black">
              {{ value.submitter }}
              <br /> {{ value.createTime }}
            </div>
            <div>
              <p
                class="ma-0 body-1 font-weight-bold font-italic text-left"
                text-color="black"
              >{{ value.remark }}</p>
            </div>
          </v-col>

          <v-col align-self="end">
            <v-chip
              class="text-uppercase ma-0"
              color="primary"
              :class="{ 'show-btns': hover }"
              label
              small
              @click.stop
            >Read More</v-chip>
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

  props: {
    size: {
      type: Number,
      required: true
    },
    value: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style>
/* .v-image__image {
  transition: 0.3s linear;
} */
.v-card {
  transition: opacity 0.4s ease-in-out
}

.v-card:not(.on-hover) {
  opacity: 0.8;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
