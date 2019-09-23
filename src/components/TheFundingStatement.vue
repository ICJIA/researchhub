<template functional>
  <div class="funding-block greycolor mb-12 mx-4 mx-sm-auto pb-6 pb-sm-0">
    <p class="funding-title">{{ $options.static.title }}</p>
    <p class="font-italic small">{{ $options.static.body }}</p>
  </div>
</template>

<script>
export default {
  static: {
    title: 'Notice of Federal Funding and Federal Disclaimer',
    body:
      'This Web site is funded through a grant from the Bureau of Justice \
Statistics, Office of Justice Programs, U.S. Department of Justice. \
Neither the U.S. Department of Justice nor any of its components operate, \
control, are responsible for, or necessarily endorse, this Web site \
(including, without limitation, its content, technical infrastructure, \
and policies, and any services or tools provided).'
  }
}
</script>

<style scoped>
.funding-block {
  display: flex;
  flex-direction: column;
  max-width: 720px;
}
.funding-title {
  font-family: 'Lato';
  font-weight: 300;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
}
</style>
