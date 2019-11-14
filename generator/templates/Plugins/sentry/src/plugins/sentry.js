import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Vue from 'vue';

if (process.env.VUE_APP_SENTRY) {
    Sentry.init({
        dsn: process.env.VUE_APP_SENTRY,
        integrations: [new Integrations.Vue({Vue, attachProps: true})],
    });
}
