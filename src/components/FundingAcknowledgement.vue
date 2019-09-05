<template functional>
  <div
    class="italic greycolor px-6 py-8"
    :class="props.bgColor ? 'bg-grey' : ''"
    style="max-width: 960px;"
  >
    <template>{{
      "This product was supported by State Justice Statistics (SJS) \
Program Grant #2018-86-CX-K006, awarded to the Illinois Criminal \
Justice Information Authority by the U.S. Department of Justice \
Office of Justice Programs' Bureau of Justice Statistics. \
Points of view in this product do not necessarily represent the \
official position or policies of the U.S. Department of Justice."
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
