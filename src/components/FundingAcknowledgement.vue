<template functional>
  <div
    class="font-italic greycolor px-6 py-8"
    :class="props.bgColor ? 'bg-grey' : ''"
    style="max-width: 960px;"
  >
    <template>{{
      'This Web site is funded through a grant from the Bureau of Justice \
Statistics, Office of Justice Programs, U.S. Department of Justice. \
Neither the U.S. Department of Justice nor any of its components operate, \
control, are responsible for, or necessarily endorse, this Web site \
(including, without limitation, its content, technical infrastructure, \
and policies, and any services or tools provided).'
    }}</template>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.bg-grey {
  background-color: #f6f6f6;
}
</style>
