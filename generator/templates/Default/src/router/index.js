import Vue from 'vue';
import Router from 'vue-router';
<%_ if (options.useAuthorisation) { _%>
import authorisation from './routes/authorisation.js';
<%_ } _%>
import authorised from './routes/authorised.js';

Vue.use(Router);

const routes = [
<%_ if (options.useAuthorisation) { _%>
  authorisation,
<%_ } _%>
  authorised,
];


routes.push(
  {
    path: '*',
    redirect: '404',
  },
);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes,
});
