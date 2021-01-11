
const routes = [
  {
    path: '/',
    component: () => import('layouts/CanvasLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'login', name: 'login', component: () => import('pages/Login.vue') },
      { path: 'cadastrar', name: 'signup', component: () => import('pages/SignUp.vue') },
      { path: 'escolher-canais', name: 'channels-selection', component: () => import('pages/ChannelsSelection.vue') }
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
