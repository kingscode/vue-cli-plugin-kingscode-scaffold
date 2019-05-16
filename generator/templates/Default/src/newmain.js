import '@babel/polyfill'
import Vue from 'vue'
import API from './API.js';
import './plugins/vuetify'
import VuetifyResource from '@kingscode/vuetify-resource';
import App from './App.vue'
import router from './router'
<%_ if (options.useAuthorisation) { _%>
import store from './store/store.js'
<%_ } _%>
import './registerServiceWorker'

Vue.prototype.$http = API;
window.$http = API;
Vue.use(VuetifyResource);

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
