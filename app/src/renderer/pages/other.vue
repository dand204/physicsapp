
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
    </v-card>
  <v-bottom-navigation
    horizontal
    class=""
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
      <span>Электричество и магнетизм</span>

      <v-icon>mdi-lightning-bolt</v-icon>
    </v-btn>

    <v-btn
      v-on:click="fetchFormulas(3)">
      <span>Моллекулярная физика</span>

      <v-icon>mdi-atom-variant</v-icon>
    </v-btn>

    <v-btn
      v-on:click="fetchFormulas(4)">
      <span>Оптика</span>

      <v-icon>reflect-horizontal</v-icon>
    </v-btn>
    <v-btn
      v-on:click="fetchFormulas(4)">
      <span>Колебания и волны</span>

      <v-icon>waveform</v-icon>
    </v-btn>
  </v-bottom-navigation>

  </v-app>
</template>
<script>
export default {
  data: () => ({
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

</style>
