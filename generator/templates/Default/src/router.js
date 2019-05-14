import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/views/Home'),
        },
        <%_ if (options.useAuthorisation) { _%>
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/Login'),
        },
        <%_ } _%>
    ],
});
