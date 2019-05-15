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
            <%_ if (options.useTemplateLoader) { _%>
            meta: {
                template: () => import('./templates/Authorisation.vue'),
            },
            <%_ } _%>
        },
        {
            path: '/password/forgotten',
            name: 'password.forgotten',
            component: () => import('./views/PasswordForgotten.vue'),
            <%_ if (options.useTemplateLoader) { _%>
            meta: {
                template: () => import('./templates/Authorisation.vue'),
            },
            <%_ } _%>
        },
        {
            path: '/password/reset/:token',
            name: 'password.reset',
            component: () => import('./views/PasswordReset.vue'),
            <%_ if (options.useTemplateLoader) { _%>
            meta: {
                template: () => import('./templates/Authorisation.vue'),
            },
            <%_ } _%>
        },
        {
            path: '/profile',
            name: 'profile',
            component: () => import('./views/Profile.vue')
        },
        <%_ } _%>
        <%_ if (options.useCrud) { _%>
        {
            path: '/users',
            name: 'users',
            component: () => import('./views/UserResource.vue')
        },
        <%_ } _%>

    ],
});
