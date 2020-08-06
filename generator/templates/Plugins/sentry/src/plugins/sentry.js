import { init } from '@sentry/browser';
import { Vue as SentryVue } from '@sentry/integrations';
import Vue from 'vue';

if (process.env.VUE_APP_SENTRY) {
  init({
    environment: process.env.VUE_APP_ENV,
    release: process.env.VUE_APP_RELEASE,
    dsn: process.env.VUE_APP_SENTRY,
    integrations: [new SentryVue({
      Vue,
      attachProps: true,
    })],
  });
}
