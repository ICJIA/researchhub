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
  },
  transpileDependencies: ['researchhub-lib', 'vuetify', 'vue-ga']
}
