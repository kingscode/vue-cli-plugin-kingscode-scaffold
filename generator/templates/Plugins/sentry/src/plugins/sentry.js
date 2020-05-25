import * as Sentry from '@sentry/browser';
import * as Integrations from '@sentry/integrations';
import Vue from 'vue';

if (process.env.VUE_APP_SENTRY) {
    Sentry.init({
        environment: process.env.VUE_APP_ENV,
        release: process.env.VUE_APP_RELEASE,
        dsn: process.env.VUE_APP_SENTRY,
        integrations: [new Integrations.Vue({Vue, attachProps: true})],
    });
}
