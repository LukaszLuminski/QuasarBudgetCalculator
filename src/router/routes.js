
const routes = [
  {
    path: '/',
    component: () => import('layouts/unauthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: '/settings', component: () => import('pages/PageSettings.vue') },
      { path: '/register', component: () => import('pages/Register.vue') },
      { path: '/reset-password', component: () => import('pages/ResetPassword.vue') },
      { path: '/new-password', component: () => import('pages/NewPassword.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
