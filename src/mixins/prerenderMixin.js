export default {
  mounted() {
    // added for renderAfterDocumentEvent (prerender-spa-plugin)
    document.dispatchEvent(new Event('render-trigger'))
  }
}
