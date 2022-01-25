<template>

  <v-app>
    <link rel="stylesheet" href="https://unpkg.com/katex@0.6.0/dist/katex.min.css">
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
  overflow: hidden;
}
.v-application code {
padding: 0;
}
span.mord.accent {
  background-color: rgb(255 255 255 / 12%) !important;
}
</style>
