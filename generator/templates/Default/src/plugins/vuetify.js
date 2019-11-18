import Vue from 'vue';
import Vuetify from 'vuetify/lib';
<%_ if (options.plugins.includes('fontawesomepro')){ _%>
import '@fortawesome/fontawesome-pro/css/all.css';
<%_ } _%>
import nl from 'vuetify/es5/locale/nl';

Vue.use(Vuetify);
export default new Vuetify({
    icons: {
        iconfont: 'fa',
<%_ if (options.plugins.includes('fontawesomepro')){ _%>
        values: {
            'close': 'far fa-times',
            'menu': 'far fa-bars',
            'delete': 'far fa-trash-alt',
            'add': 'far fa-plus',
            'edit': 'far fa-pencil-alt',
            'search': 'far fa-search',
        },
<%_ } else { _%>
        values: {
            'close': 'fas fa-times',
            'menu': 'fas fa-bars',
            'delete': 'fas fa-trash-alt',
            'add': 'fas fa-plus',
            'edit': 'fas fa-pencil-alt',
            'search': 'fas fa-search',
        },
<%_ } _%>
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
