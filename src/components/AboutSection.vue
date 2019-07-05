<template>
  <div>
    <v-container pt-0>
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8 class="background-white">
          <v-container>
            <v-layout justify-center pt-3 pb-5>
              <h2 class="uppercase light large">- {{ title }} -</h2>
            </v-layout>

            <v-container py-0>
              <v-layout row wrap justify-center>
                <v-flex xs12 sm10 xl8>
                  <slot></slot>

                  <div v-if="subNum" class="mb-3">
                    <template v-for="sub in subNum">
                      <h2 :key="`subtitle${sub}`" class="mb-3 light">
                        <slot :name="`subtitle${sub}`"></slot>
                      </h2>

                      <p :key="`subbody${sub}`">
                        <slot :name="`subbody${sub}`"></slot>
                      </p>
                    </template>
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-container>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    subNum: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.background-white {
  background-color: white;
}
</style>
