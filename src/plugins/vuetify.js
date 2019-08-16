import Vue from 'vue'
import Vuetify, {
  VAppBar,
  VFooter,
  VIcon,
  VNavigationDrawer,
  VSpacer
} from 'vuetify/lib'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VFooter,
    VIcon,
    VNavigationDrawer,
    VSpacer
  }
})

export default new Vuetify({
  theme: { disable: true }
})
