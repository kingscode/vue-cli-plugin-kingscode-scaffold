import Vue from 'vue';
import Router from 'vue-router';
<%_ if (options.useAuthorisation) { _%>
import AuthorisationGuard from '../guards/AuthorisationGuard';
<%_ } _%>

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            redirect: {name: 'home'},
        },
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
                    path: '/auth/callback',
                    name: 'auth.callback',
                    component: () => import('@/views/AuthorisationCallback'),
                },
                {
                    path: '/password/forgotten',
                    name: 'password.forgotten',
                    component: () => import('@/views/PasswordForgotten.vue'),
                },
                {
                    path: '/password/reset/:token',
                    name: 'password.reset',
                    component: () => import('@/views/PasswordReset.vue'),
                },
                {
                    path: '/invitation/accept/:token',
                    name: 'invitation.accept',
                    component: () => import('@/views/InvitationAccept.vue'),
                },
                {
                    path: '/registration/verify',
                    name: 'registration.verify',
                    component: () => import('@/views/Authorisation/Verify.vue'),
                },
            ]
        },
         <%_ } _%>
        {
            path: '',
            <%_ if (options.useAuthorisation) { _%>
            beforeEnter: AuthorisationGuard,
            <%_ } _%>
            component: () => import('@/templates/Default'),
            children: [
                {
                    path: '/',
                    name: 'home',
                    component: () => import('@/views/Home'),
                },
                 <%_ if (options.useCrud) { _%>
                {
                    path: '/users',
                    name: 'users',
                    component: () => import('@/views/UserResource.vue')
                },
                  <%_ } _%>
                {
                    path: '/404',
                    name: '404',
                    component: () => import('@/views/PageNotFound.vue'),
                },
                {
                    path: '/403',
                    name: '403',
                    component: () => import('@/views/PageForbidden.vue'),
                },
                {
                    path: '*',
                    redirect: '/404'
                },
            ],
        },
    ],
});
