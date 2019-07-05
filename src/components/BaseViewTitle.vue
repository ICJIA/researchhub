<template>
  <div class="view-title">
    <v-container :class="home ? 'pb-1' : 'py-3'">
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    home: Boolean
  }
}
</script>

<style scoped>
.view-title {
  font-family: 'Oswald', sans-serif;
  color: white;
  background-color: #466c8c;
}
</style>
