export default {
  path: '',
  component: () => import('@/templates/Authorisation'),
  children: [
    {
      path: 'login',
      name: 'login',
      component: () => import('@/views/authorisation/Login.vue'),
    },
    {
      path: 'auth/callback',
      name: 'auth.callback',
      component: () => import('@/views/authorisation/AuthorisationCallback.vue'),
    },
    {
      path: 'password/forgotten',
      name: 'password.forgotten',
      component: () => import('@/views/authorisation/PasswordForgotten.vue'),
    },
    {
      path: 'password/reset/:token',
      name: 'password.reset',
      component: () => import('@/views/authorisation/PasswordReset.vue'),
    },
    {
      path: 'invitation/accept/:token',
      name: 'invitation.accept',
      component: () => import('@/views/authorisation/InvitationAccept.vue'),
    },
    {
      path: 'registration/verify',
      name: 'registration.verify',
      component: () => import('@/views/authorisation/RegistrationVerify.vue'),
    },
  ],
};
