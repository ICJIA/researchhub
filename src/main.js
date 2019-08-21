import Vue from 'vue'
import vuetify from './plugins/vuetify'

import SocialSharing from 'vue-social-sharing'
import 'icjia-research-lib/style.css'
import 'nprogress/nprogress.css'

import App from './App.vue'
import router from './router'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(SocialSharing)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount(`#app`, true)
