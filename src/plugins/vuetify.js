import Vue from 'vue'
import Vuetify, {
  VAppBar,
  VIcon,
  VNavigationDrawer,
  VSpacer
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VIcon,
    VNavigationDrawer,
    VSpacer
  }
})

export default new Vuetify({
  theme: { disable: true }
})
