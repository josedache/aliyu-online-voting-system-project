import Vue from 'vue'
import Vuetify, { VLayout } from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import colors from 'vuetify/es5/util/colors'
Vue.use(Vuetify, {
  components: {
    VLayout
  },
  iconfont: 'md',
  theme: {
    primary: colors.green.darken1, // #E53935
    secondary: colors.green.lighten4, // #FFCDD2
    accent: colors.green.accent4, // #3F51B5    
  }
})
