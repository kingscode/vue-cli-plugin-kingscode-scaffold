import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        <%_ if (options.useAuthorisation) { _%>
        {
            path: '',
            component: () => import('@/templates/Authorisation'),
            children: [
                {
                    path: '/login',
                    name: 'login',
                    component: () => import('@/views/Login'),
                },
                {
                    path: '/password/forgotten',
                    name: 'password.forgotten',
                    component: () => import('./views/PasswordForgotten.vue'),
                },
                {
                    path: '/password/reset/:token',
                    name: 'password.reset',
                    component: () => import('./views/PasswordReset.vue'),
                },
                {
                    path: '/invitation/accept/:token',
                    name: 'invitation.accept',
                    component: () => import('./views/InvitationAccept.vue'),
                },
            ]
        },
         <%_ } _%>
        {
            path: '',
            beforeEnter: AuthorisationGuard,
            component: () => import('@/templates/Default'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/Home'),
                },
                <%_ if (options.useAuthorisation) { _%>
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
                {
                    path: '/404',
                    name: '404',
                    component: () => import('./views/PageNotFound.vue'),
                },
                {
                    path: '/403',
                    name: '403',
                    component: () => import('./views/PageForbidden.vue'),
                },
                {
                    path: '*',
                    redirect: '/404'
                },
            ],
        },


    ],
});
