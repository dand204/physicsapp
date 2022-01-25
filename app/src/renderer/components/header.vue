<template>
  <v-app-bar
    app
    color="white"
    flat
    class="ma-2 ">

    <div class="mx-auto">
    <v-container>
      <v-btn
        v-for="link in links"
        :key="link"
        text
        @click="$router.push(link.link)">

        {{ link.name }}
      </v-btn>
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
      },

    ],
  }),
}
</script>
<style>

/*noinspection ALL*/

header {
top: 0;
  max-height: 0;
}
</style>


