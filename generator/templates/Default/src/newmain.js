import '@babel/polyfill'
import Vue from 'vue'
import {vuetify} from './plugins';
<%_ if (options.useCrud) { _%>
import VuetifyResource from '@kingscode/vuetify-resource';
<%_ } _%>
import App from './App.vue';
import router from './router';
<%_ if (options.useAuthorisation) { _%>
import store from './store';
<%_ } _%>

<%_ if (options.useAuthorisation) { _%>
Vue.prototype.$store = store;
<%_ } _%>
<%_ if (options.useCrud) { _%>
Vue.use(VuetifyResource);
<%_ } _%>

Vue.config.productionTip = false;

new Vue({
    router,
    vuetify,
<%_ if (options.useAuthorisation) { _%>
    store,
<%_ } _%>
    render: h => h(App)
}).$mount('#app');
