import AuthorisationGuard from '@/router/guards/AuthorisationGuard.js';

export default {
  path: '',
  beforeEnter: AuthorisationGuard,
  component: () => import('@/templates/Default'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('@/views/Home'),
    },{
      path: '/users',
      name: 'users',
      component: () => import('@/views/UserResource.vue')
    },
  ]
}
