<template>
<v-app>

    <v-card-title class="ma-2 rls">
      Правила
    </v-card-title>
    <v-row justify="space-between">
    <v-card justify="space-between" width="30%" max-width="470px" min-width="300px"
            class="deep-orange accent-4 rounded-lg mx-4 pl-1 mb-4"
             dark>
      <v-col cols="">
        <v-responsive max-width="2cols" class="">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            class="ma-2"
            solo-inverted
            clear-icon="mdi-close-circle-outline"
            v-model="search"
            label="Поиск по правилам"
          ></v-text-field>
        </v-responsive>

        <v-card-text>
        <v-treeview

          :search="search"
          :filter="filter"
          open-all
          :active.sync="active"
          :items="items"
          :load-children="fetchRules"
          :open.sync="open"
          activatable
          color="grey lighten-5 --text"
          open-on-click
          transition
        >

          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">
              mdi-react
            </v-icon>
          </template>

        </v-treeview>
        </v-card-text>
      </v-col>

    </v-card>


      <v-col
        class="d-flex text-center"

      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style=""
          >
            Welcome Info
          </div>
          <v-card
            v-else
            :key="selected.id"
            class="pt-5 mx-auto deep-orange lighten-5 pl-1 mb-4"
            width="95%"
            rounded="lg"
            flat

          >
            <v-card-text>

              <h3 class="text-h5 mb-2 font-weight-bold black--text">
                {{ selected.name }}
              </h3>
              <div class="black--text">
                {{ selected.additional }}
              </div>
            </v-card-text>

            <v-row
              class="text-left"
              tag="v-card-text"
            >

              <v-col class="text-left pa-1">
                <div class="container" >
                  <markdown-it-vue
                    class="md-body markdown-body black--text"
                    :content= "selected.data"
                    :options="options"
                  />
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>

</v-app>
</template>

<script>
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
import MarkdownItVue from 'markdown-it-vue'
export default {
  data: () => ({
    testt: "# test \n" +  " **Inline Math**: $\\sqrt{3x-1}+(1+x)^2$  \n" +
      " **Block Math**  " + " $\\left(\\LARGE{AB}\\right)$ \n" +
      "$$\\begin{array}{c}\n" +
      "\n" +
      "      \\nabla \\times \\vec{\\mathbf{B}} -\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{K}}}{\\partial t} &\n" +
      "      = \\frac{4\\pi}{c}\\vec{\\mathbf{j}}    \\nabla \\cdot \\vec{\\mathbf{E}} & = 4 \\pi \\rho \\\\\n" +
      "\n" +
      "      \\nabla \\times \\vec{\\mathbf{E}}\\, +\\, \\frac1c\\, \\frac{\\partial\\vec{\\mathbf{B}}}{\\partial t} & = \\vec{\\mathbf{0}} \\\\\n" +
      "\n" +
      "      \\nabla \\cdot \\vec{\\mathbf{B}} & = 0\n" +
      "\n" +
      "      \\end{array}$$" +
      "\n" + "$$\\begin{align*} a&=b+c \\\\d+e&=f \\end{align*}$$" + "\n"+ "$$\\sum_{\substack{0<i<m\\\0<j<n}}$$" + "\n" +
      "- [x] Mercury\n" +
      "- [x] Venus\n" +
      "- [x] Earth (Orbit/Moon)\n" +
      "- [x] Mars\n" +
      "- [ ] Jupiter\n" +
      "- [ ] Saturn\n" +
      "- [ ] Uranus\n" +
      "- [ ] Neptune\n" +
      "- [ ] Comet Haley",
    options: {
      markdownIt: {
        linkify: true,
        html:    true,
        breaks: true,
        typographer:  false,
        quotes: '“”‘’',

      },
  linkAttributes: {
    attrs: {
      target: '_blank',
        rel: 'noopener'
    }
  },
  katex: {
    throwOnError: false,
      errorColor: 'red'
  },
  icons: 'font-awesome',
    githubToc: {
  tocFirstLevel: 2,
    tocLastLevel: 3,
    tocClassName: 'toc',
    anchorLinkSymbol: '',
    anchorLinkSpace: false,
    anchorClassName: 'anchor',
    anchorLinkSymbolClassName: 'octicon octicon-link'
},
  mermaid: {
    theme: 'default'
  },
  image: {
    hAlign: 'left',
      viewer: true
  }
    },
    active: [],
    avatar: null,
    open: [],
    rules: [],
    search: null,
    caseSensitive: false,
    rules2d: []

  }),
  components: {
    MarkdownItVue
  },
  computed: {
    items () {
      return [
        {
          name: 'Раздел',
          children: this.rules,
        },
      ]
    },
    selected () {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return  this.rules2d.find(rules => rules.id === id);
    },
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  watch: {
      rules: function(val) {
        var me = this;
        this.rules.forEach(function (item) {
          me.rules2d.push(item);
          var children = item.children
          if (typeof children !== "undefined") {
            var me2 = me
            children.forEach(function (item2) {
              me2.rules2d.push(item2)
            });
          }
        });
        console.log(this.rules2d)
      }
  },
  methods: {
    async fetchRules (item) {
      return fetch("https://raw.githubusercontent.com/dand204/physicsapp/main/app/src/renderer/pages/lib1.json")
        .then(res => res.json())
        .then(json => (this.rules.push(...json)))
        .catch(err => console.warn(err))
    },
  },
}
</script>
<style scoped>


* {
  font-family: Roboto, sans-serif;

}
.markdown-body {
  font-family: 'Nunito', sans-serif;
  font-size: medium;
  font-weight: 500;
  padding-inline: 10%;
}

.rls {
  font-size: x-large;
  font-weight: bold;
}
</style>
