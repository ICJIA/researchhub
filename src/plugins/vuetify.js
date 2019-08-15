import Vue from 'vue'
import Vuetify, { VIcon } from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VIcon
  }
})

export default new Vuetify({
  theme: { disable: true }
})
