<template>
  <div>
    <v-col class="mx-auto" cols="10" lg="8" xl="7">
      <v-row class="section-title px-4" justify="space-between">
        <h2 class="wide">{{ title }}</h2>

        <v-col class="pa-0 text-end" cols="12" sm="2" align-self="end">
          <router-link v-if="to" :to="to" class="font-lato small">
            <template>{{ 'see more' }}</template>
          </router-link>

          <a
            v-if="href"
            class="font-lato small"
            :href="href"
            rel="noreferrer"
            target="_blank"
          >
            <template>{{ 'see more' }}</template>
          </a>
        </v-col>
      </v-row>
    </v-col>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    href: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
