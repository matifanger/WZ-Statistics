<template>
  <v-app dark>
    <v-main>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
.theme--dark.v-application {
  background-color: var(--v-background-base, #121212) !important;

}.theme--light.v-application {
  background-color: var(--v-background-base, white) !important;
}
</style>