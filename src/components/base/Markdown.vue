<script>
// Utilities
import marked from "marked";
import { parseLink } from "@/util/helpers";
import { get, sync } from "vuex-pathify";

marked.setOptions({
  headerIds: false,
  breaks: true,
  smartLists: true,
});

export default {
  name: "BaseMarkdown",

  props: {
    code: {
      type: [Array, String],
      default: "",
    },
    source: {
      type: Object,
      default: () => ({}),
    },
    tag: {
      type: String,
      default: "div",
    },
  },

  data: () => ({
    timeout: null,
  }),

  computed: {
    //lang: sync("route/params@lang"),
    namespace: get("documentation/namespace"),
    page: get("documentation/page"),
  },

  mounted() {
    this.init();
  },

  beforeDestroy() {
    clearTimeout(this.timeout);
  },

  methods: {
    init() {
      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        const links = this.$el.querySelectorAll(
          'a.v-markdown--link[href^="#"]'
        );

        Array.prototype.forEach.call(links, (el) => {
          el.addEventListener("click", this.onLinkClick);
        });
      }, 300);
    },
    onLinkClick(e) {
      e.preventDefault();

      this.$router.push(e.target.getAttribute("href"));
    },
  },

  render(h, context) {
    let code = this.code || this.source;
    if (!code) {
      if ((this.$slots.default || []).length > 0) {
        code = this.$slots.default[0].text.trim();
      }
      if (code.indexOf(".") > -1) {
        code = code;
      } else if (this.namespace && this.page) {
        code = `${this.namespace}.${this.page}.${code}`;
      }
    } else if (this.source) {
      code = this.source.code;
    }

    const innerHTML = code;

    return h(this.tag, {
      staticClass: "v-markdown",
      class: { "mb-6": true },
      domProps: { innerHTML },
    });
  },
};
</script>

<style lang="scss">
.v-markdown:last-child p,
.v-markdown:last-child {
  margin-bottom: 0 !important;
}
.v-markdown--link {
  text-decoration: none;
  font-weight: 500;
}

// .v-icon.v-icon {
//   font-size: 14px;
//   margin-left: 4px;
//   vertical-align: baseline;
// }

.v-markdown > h4 {
  margin: 8px 0;
}

.v-markdown code {
  display: block;
  word-wrap: normal;
  overflow: auto;
  box-shadow: none !important;
  color: #c0341d !important;
  background-color: #fbe5e1 !important;
}
.v-markdown kbd > code {
  background: transparent !important;
  color: inherit !important;
}
</style>

