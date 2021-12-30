<template>
<v-app>

    <v-card-title class="ma-2">
      Правила
    </v-card-title>
    <v-row justify="space-between">
    <v-card justify="space-between" width="400px"
            class="light-blue lighten-2  rounded-lg mx-4 pl-1 mb-4"
            color="white" dark>
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
          color="white --text"
          open-on-click
          transition
        >

          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">
              mdi-account
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
            class="pt-6 mx-auto ma-1 light-green lighten-5"
            rounded="rounded"
            flat

          >
            <v-card-text>

              <h3 class="text-h5 mb-2">
                {{ selected.name }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.email }}
              </div>
              <div class="blue--text subheading font-weight-bold">
                {{ selected.username }}
              </div>
            </v-card-text>

            <v-row
              class="text-left"
              tag="v-card-text"
            >
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Company:
              </v-col>
              <v-col>{{ selected.company.name }}</v-col>
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Website:
              </v-col>
              <v-col>
                <a
                  :href="`//${selected.website}`"
                  target="_blank"
                >{{ selected.website }}</a>
              </v-col>
              <v-col
                class="text-right mr-4 mb-2"
                tag="strong"
                cols="5"
              >
                Phone:
              </v-col>
              <v-col>{{ selected.phone }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>

</v-app>
</template>

<script>
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    rules: [],
    search: null,
    caseSensitive: false,
    rules2d: []

  }),
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
</style>
