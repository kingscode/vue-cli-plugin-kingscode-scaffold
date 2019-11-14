import cssVars from 'css-vars-ponyfill';
<%_ if (options.plugins.includes('analytics')) { _%>
import './analytics';
<%_ } _%>
<%_ if (options.plugins.includes('sentry')) { _%>
import './sentry';
<%_ } _%>
import vuetify from './vuetify';

cssVars();

export {vuetify};
