<template>
  <div>
    <base-markdown>
      <slot />
    </base-markdown>
  </div>
</template>

<script>
// Mixins
import Measurable from "vuetify/es5/mixins/measurable";
import Themeable from "vuetify/es5/mixins/themeable";

export default {
  name: "BaseText",
  components: {
    BaseMarkdown: () => import("@/components/base/Markdown")
  },
  mixins: [Measurable, Themeable]
};
</script>
