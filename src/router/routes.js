
const routes = [
  {
    path: '/login',
    component: () => import('layouts/unauthLayout.vue'),
    meta: {
      hideIfAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/register',
    component: () => import('layouts/unauthLayout.vue'),
    meta: {
      hideIfAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/reset-password',
    query: { auth: 'false' },
    component: () => import('layouts/unauthLayout.vue'),
    meta: {
      hideIfAuth: true
    },
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/authLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/authLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/PageSettings.vue') }
    ]
  },
  {
    path: '/reset-password',
    query: { auth: 'true' },
    component: () => import('layouts/authLayout.vue'),
    meta: {
      requiresAuth: true
    },
    children: [
      { path: '', component: () => import('pages/ResetPassword.vue') }
    ]
  },
  {
    path: '/new-password',
    component: () => import('layouts/unauthLayout.vue'),
    children: [
      { path: '', component: () => import('pages/NewPassword.vue') }
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
