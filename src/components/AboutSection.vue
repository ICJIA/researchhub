<template>
  <v-col class="mx-auto" cols="12" sm="10" lg="8" xl="7">
    <v-sheet class="py-6" elevation="1">
      <h2 class="about-section-title wide py-6">- {{ title }} -</h2>

      <v-col class="mx-auto" cols="10" lg="8">
        <slot></slot>

        <div v-if="subNum" class="my-4">
          <template v-for="sub in subNum">
            <h2 :key="`subtitle${sub}`" class="font-weight-light mb-4">
              <slot :name="`subtitle${sub}`"></slot>
            </h2>

            <p :key="`subbody${sub}`">
              <slot :name="`subbody${sub}`"></slot>
            </p>
          </template>
        </div>
      </v-col>
    </v-sheet>
  </v-col>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    subNum: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.about-section-title {
  font-size: 1.2em;
  font-weight: 300;
  text-transform: uppercase;
  text-align: center;
}
</style>
