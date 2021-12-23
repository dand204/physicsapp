<template>
  <v-app-bar
    app
    color="white"
    flat
    class="ma-2">

    <div class="right-corner">
    <v-container>
      <v-avatar
        size="32">
      </v-avatar>
      <v-btn
        v-for="link in links"
        :key="link"
        text
        @click="$router.push(link.link)">

        {{ link.name }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-container>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: 'HeaderComponent',
  data: () => ({
    links: [
      {
        name : 'Правила',
        link: '/',
      },
      {
        name : 'Формулы',
        link: '/other',
      }
    ],
  }),
}
</script>
<style>

/*noinspection ALL*/
.right-corner {
  margin: 0 30%;
  display: inline;

}
header {
top: 0;
  max-height: 0px;
}
</style>


