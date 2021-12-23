<template>
<v-app>
  <v-card class="">

    <v-card-title class="ma-2">
      Правила
    </v-card-title>
    <v-row justify="space-between"
    >
    <v-card justify="space-between" width="400px"
            class="light-blue lighten-2  rounded mx-3 pl-1 "
            color="white"
    dark>
      <v-col cols=""
             >
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
          :load-children="fetchUsers"
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
  </v-card>
</v-app>
</template>

<script>
const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
]
const pause = ms => new Promise(resolve => setTimeout(resolve, ms))
export default {
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    rules: [],
    search: null,
    caseSensitive: false,

  }),
  computed: {
    items () {
      return [
        {
          name: 'Раздел 1',
          children: this.rules,

        },
        {
          name: 'Раздел 2',
          children: this.rules,

        },

      ]


    },
    selected () {
      if (!this.active.length) return undefined
      const id = this.active[0]
      return this.rules.find(user => user.id === id)
    },
    filter () {
      return this.caseSensitive
        ? (item, search, textKey) => item[textKey].indexOf(search) > -1
        : undefined
    },
  },
  watch: {
    selected: 'randomAvatar',
  },
  methods: {
    async fetchUsers (item) {
      return fetch("lib1")
        .then(res => res.json())
        .then(json => (item.children.push(...json)))
        .catch(err => console.warn(err))
    },
    randomAvatar () {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
    },
  },
}
</script>
<style scoped>


* {
  font-family: Roboto, sans-serif;

}
</style>
