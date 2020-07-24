<template>
  <div>
    <base-markdown :source="text">
      <slot />
    </base-markdown>
  </div>
</template>

<script>
// Mixins
import Measurable from "vuetify/es5/mixins/measurable";
import Themeable from "vuetify/es5/mixins/themeable";
import { mapGetters } from "vuex";

export default {
  name: "BaseText",
  components: {
    BaseMarkdown: () => import("@/components/base/Markdown")
  },
  computed: {
    ...mapGetters(["article"]),
    text: () => {
      let source = this.article.content;
      let code = this.article.contentHtml;
      return { source, code };
    }
  },

  mixins: [Measurable, Themeable]
};
</script>
