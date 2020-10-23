import cssVars from 'css-vars-ponyfill';
<%_ if (options.plugins.includes('analytics')) { _%>
import './analytics';
<%_ } _%>
<%_ if (options.plugins.includes('sentry')) { _%>
import './sentry';
<%_ } _%>
import i18n from './i18n';
import vuetify from './vuetify';

cssVars();

export {
  i18n, vuetify,
};

