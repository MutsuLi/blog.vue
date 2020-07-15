<script>
// Utilities
import marked from "marked";
import { parseLink } from "@/util/helpers";
import { get, sync } from "vuex-pathify";

marked.setOptions({
  headerIds: false,
  breaks: true,
  smartLists: true
});

export default {
  name: "BaseMarkdown",

  props: {
    code: {
      type: [Array, String],
      default: ""
    },
    source: {
      type: String,
      default: ""
    },
    tag: {
      type: String,
      default: "div"
    }
  },

  data: () => ({
    timeout: null
  }),

  computed: {
    lang: sync("route/params@lang"),
    namespace: get("documentation/namespace"),
    page: get("documentation/page")
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

        Array.prototype.forEach.call(links, el => {
          el.addEventListener("click", this.onLinkClick);
        });
      }, 300);
    },
    onLinkClick(e) {
      e.preventDefault();

      this.$router.push(e.target.getAttribute("href"));
    }
  },

  render(h, context) {
    let code = this.code || this.source;

    if (!this.code) {
      if ((this.$slots.default || []).length > 0) {
        code = this.$slots.default[0].text.trim();
      }

      if (code.indexOf(".") > -1) {
        code = code;
      } else if (this.namespace && this.page) {
        code = `${this.namespace}.${this.page}.${code}`;
      }
    }

    // Probably wants to make a list
    const wantsList = Array.isArray(code);

    if (wantsList) code = code.map(c => `- ${c}\n`).join("");

    if (typeof code !== "string") {
      console.log(`Invalid type ${typeof code}, expected string`, code);
      code = "";
    }
    var rendererMD = new marked.Renderer();
    rendererMD.code  = (code, language) => {
      console.log(code);
      var escapedText = code.toLowerCase().replace(/[^\w]+/g, "-");

      return (
        //<code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> lexer = <span class="hljs-keyword">new</span> marked.Lexer()</code>
        `<code class="${language}"  style="word-break: break-word; white-space: initial;>"
        <span class="hljs-keyword">${code}</span>
        </code>`
      );
    };
    // Convert markdown links
    code = code.replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink);

    const innerHTML = marked(code, { renderer: rendererMD });
    console.log(wantsList);
    return h(this.tag, {
      staticClass: "v-markdown",
      class: { "mb-6": wantsList },
      domProps: { innerHTML }
    });
  }
};
</script>

<style lang="sass">
.v-markdown:last-child p,
.v-markdown:last-child
  margin-bottom: 0 !important

  .v-markdown--link
    text-decoration: none
    font-weight: 500

    &:hover
      text-decoration: underline

    .v-icon.v-icon
      font-size: 14px
      margin-left: 4px
      vertical-align: baseline

  .v-markdown > h4
    margin: 8px 0

  .v-markdown code
    box-shadow: none !important
    color: #C0341D !important
    background-color: #fbe5e1 !important

  .v-markdown kbd > code
    background: transparent !important
    color: inherit !important
</style>
