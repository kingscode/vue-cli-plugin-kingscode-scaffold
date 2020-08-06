import Vue from 'vue';
import VueAnalytics from 'vue-analytics';
import router from './../router';

if (process.env.VUE_APP_ANALYTICS) {
  Vue.use(VueAnalytics, {
    id: process.env.VUE_APP_SENTRYVUE_APP_SENTRY,
    router,
  });
}
