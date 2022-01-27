
<template>
  <v-app>
    <v-card-title class="ma-2 rls">
      Формулы
    </v-card-title>
    <v-card
      width="60%"
      class="mx-auto justify-center"
      elevation="0"
    >

        <v-col


       class="mx-auto"
        >

            <v-chip-group
              mandatory
              show-arrows
              v-model="selection"
              active-class="deep-orange accent-4 white--text"
            >
              <v-chip
                class="deep-orange lighten-4"
                v-for="tag in tags"
                :key="tag.id"

              >
                {{ tag.name }}


              </v-chip>

            </v-chip-group>

        </v-col>
    </v-card>
    <v-card
      height="60%"
      width="80%"
      class="mx-auto mt-5"
    >
    <v-card-text
    v-if="selected !== undefined"
      >
      {{ selected.name }}
    </v-card-text>
      <markdown-it-vue v-if="selected !== undefined"
        class="text-h1 text-center md-body markdown-body black--text mx-auto"
        :content= "selected.formula"
        :options="options"
      />
      <markdown-it-vue v-if="selected !== undefined"
        class="markdown-body text-center my-auto black--text"
        :content= "selected.description"
        :options="options"
      />

    </v-card>
  <v-bottom-navigation
    class="mx-auto blocks"
    :value="value"
    color="teal"
    grow
    absolute
  >
    <v-btn
      v-on:click="fetchFormulas(1)">
      <span>Механика</span>

      <v-icon>mdi-wrench</v-icon>
    </v-btn>

    <v-btn
      v-on:click="fetchFormulas(2)">
      <span>Электричество</span>

      <v-icon>mdi-lightning-bolt</v-icon>
    </v-btn>
    <v-btn
      v-on:click="fetchFormulas(3)">
      <span>Магнитизм</span>

      <v-icon>mdi-magnet</v-icon>
    </v-btn>

    <v-btn
      v-on:click="fetchFormulas(4)">
      <span>Моллекулярная физика</span>

      <v-icon>mdi-atom-variant</v-icon>
    </v-btn>

    <v-btn
      v-on:click="fetchFormulas(5)">
      <span>Колебания</span>

      <v-icon>mdi-waveform</v-icon>
    </v-btn>
  </v-bottom-navigation>

  </v-app>
</template>
<script>
import MarkdownItVue from "markdown-it-vue";

export default {
  data: () => ({
    options: {
      markdownIt: {
        linkify: true,
        html:    true,
        breaks: true,
        typographer:  false,
        quotes: '“”‘’',
      },
      katex: {
        throwOnError: false,
        errorColor: 'red'
      },
      icons: 'font-awesome',
      mermaid: {
        theme: 'default'
      } },
    selection: [],
    value: 0,
    tags: [],

  }),
  computed: {
  selected () {
    const id = this.selection
    return  this.tags.find(rules => rules.id === id);
  }
  },
  mounted() {
    std: {
      this.fetchFormulas(1)
    }
  },
  components: {
    MarkdownItVue
  },
  methods: {
  fetchFormulas (tm) {
    this.tags = []
    return fetch("https://raw.githubusercontent.com/dand204/physicsapp/main/app/src/extraResources/formuls" + tm + ".json")
      .then(res => res.json())
      .then(json => (this.tags.push(...json)))
      .catch(err => console.warn(err))
  },
}
}
</script>
<style>
.rls {
  font-size: x-large;
  font-weight: bold;
}
.blocks span {
  font-size: 93%;
}
.markdown-body {
  font-family: 'Nunito', sans-serif;
  font-size: medium;
  font-weight: 500;
  align-content: center;
  align-items: center;
}
.gt {
height: max-content;
}
</style>
