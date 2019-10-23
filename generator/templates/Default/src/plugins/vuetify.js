import Vue from 'vue';
import Vuetify from 'vuetify';
import '@fortawesome/fontawesome-pro/css/all.css';
import 'vuetify/dist/vuetify.min.css';
import nl from 'vuetify/es5/locale/nl';

Vue.use(Vuetify);
export default new Vuetify({
    icons: {
        iconfont: 'fa',
        values: {
            'close': 'far fa-times',
            'menu': 'far fa-bars',
            'delete': 'far fa-trash-alt',
            'add': 'far fa-plus',
            'edit': 'far fa-pencil-alt',
            'search': 'far fa-search',
        },
    },
    customProperties: true,
    lang: {
        locales: {nl},
        current: 'nl',
    },
    theme: {
        options: {
            customProperties: true,
        },
        themes: {
            light: {
                primary: '#002F4E',
                secondary: '#000000',
                accent: '#FFD0B1',
            },
        },
    },
});
