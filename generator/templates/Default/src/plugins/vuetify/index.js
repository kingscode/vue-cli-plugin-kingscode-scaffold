import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import nl from 'vuetify/es5/locale/nl';
import icons from './icons';
import themes from './theme';

Vue.use(Vuetify);
export default new Vuetify({
  icons,
  lang: {
    locales: { nl },
    current: 'nl',
  },
  theme: {
    themes,
  },
});
