<template>
  <v-container my-5 text-xs-center>
    <h1>404 - Page not found</h1>

    <v-container>
      <p>Sorry. The page you are looking for does not exist.</p>
    </v-container>

    <v-btn flat to="/">return to home</v-btn>
  </v-container>
</template>

<script>
export default {
  mounted() {
    document.dispatchEvent(new Event('render-event'))
  }
}
</script>
