import Vue from 'vue';
import nl from 'vuetify/es5/locale/nl';
import Vuetify from 'vuetify/lib';
import { dark, light } from './theme';
import icons from '@/plugins/vuetify/icons';

Vue.use(Vuetify);
export default new Vuetify({
  icons,
  lang: {
    locales: { nl },
    current: 'nl',
  },
  theme: {
    dark: false,
    themes: {
      light,
      dark,
    },
  },
});
