const { publicPath } = require('./src/config')

/* compression */
const BrotliPlugin = require('brotli-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const zopfli = require('@gfx/zopfli')

const compressionTest = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const compressionPlugins = [
  new CompressionPlugin({
    algorithm(input, compressionOptions, callback) {
      return zopfli.gzip(input, compressionOptions, callback)
    },
    compressionOptions: {
      numiterations: 15
    },
    minRatio: 0.99,
    test: compressionTest
  }),
  new BrotliPlugin({
    test: compressionTest,
    minRatio: 0.99
  })
]

/* prerender */
const fs = require('fs')
const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

const prerenderRoutes = JSON.parse(fs.readFileSync('./routes.json'))
const preprenderPlugins = [
  new PrerenderSPAPlugin({
    staticDir: path.join(__dirname, 'dist'),
    outputDir: path.join(__dirname, 'prerendered'),
    routes: prerenderRoutes,
    postProcess(renderedRoute) {
      renderedRoute.html = renderedRoute.html
        .replace(/<script (.*?)>/g, `<script $1 defer>`)
        .replace(`id="app"`, `id="app" data-server-rendered="true"`)

      return renderedRoute
    },
    renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
      // headless: false, // for debugging only
      maxConcurrentRoutes: 4,
      renderAfterDocumentEvent: 'render-trigger'
    })
  })
]

module.exports = {
  publicPath: process.env.NODE_ENV === `production` ? publicPath : '/',
  configureWebpack: config => {
    config.entry.app = './src/entry.js'

    if (process.env.NODE_ENV === `production`) {
      config.optimization.splitChunks.minSize = 0
      config.optimization.splitChunks.maxSize = 250000
      config.optimization.splitChunks.chunks = 'all'
      config.plugins.push(...compressionPlugins)
    }

    if (process.env.VUE_APP_PRERENDER) config.plugins.push(...preprenderPlugins)
  },
  transpileDependencies: ['icjia-research-lib', 'vuetify', 'vue-ga']
}
