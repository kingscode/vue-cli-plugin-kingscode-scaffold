import Vue from 'vue';
import Vuetify from 'vuetify';
import '@fortawesome/fontawesome-pro/css/all.css';
import 'vuetify/dist/vuetify.min.css';
import nl from 'vuetify/es5/locale/nl';

Vue.use(Vuetify, {
    customProperties: true,
    iconfont: 'fa',
    icons: {
        'close': 'fas fa-times',
        'menu': 'fas fa-bars',
        'delete': 'fas fa-trash',
        'add': 'fas fa-plus',
        'edit': 'fas fa-pencil-alt',
        'search': 'fas fa-search',
    },
    lang: {
        locales: {nl},
        current: 'nl',
    },
    theme: {
        primary: '#002F4E',
        secondary: '#000000',
        accent: '#FFD0B1',
    },
});
