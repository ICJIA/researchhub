<template>
  <div>
    <v-container>
      <v-layout justify-center>
        <v-flex xs12 sm10 xl8>
          <v-layout align-end justify-space-between class="section-title">
            <h2>{{ title }}</h2>

            <router-link v-if="to" :to="to" class="font-lato small">
              <template>{{ 'see more' }}</template>
            </router-link>

            <a
              v-if="href"
              :href="href"
              target="_blank"
              class="font-lato small"
              rel="noreferrer"
            >
              <template>{{ 'see more' }}</template>
            </a>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    to: String,
    href: String
  }
}
</script>
