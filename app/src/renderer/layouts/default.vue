<template>
  <v-app>
    <app-header />
    <nuxt />
  </v-app>
</template>

<script>
import appHeader from '@/components/header'

export default {
  name: 'DefaultLayout',
  components: { appHeader }
}
</script>

<style>
body {
  margin: 0 !important;
  top: 20px;
  padding: 5px;
  overflow: hidden;
}

</style>
