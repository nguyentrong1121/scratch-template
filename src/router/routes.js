const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexEthers.vue') },
      { path: '/games', component: () => import('pages/Games.vue') },
      { path: '/myScratchcards', component: () => import('pages/Tickets.vue') },
      { path: '/test', component: () => import('pages/Scrttest.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
