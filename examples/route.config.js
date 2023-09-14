import { createRouter, createWebHashHistory } from 'vue-router';
const routes = [
  {
    path: '/create',
    component: () => import('./view/create')
  },
  {
    path: '/',
    component: () => import('./view/page')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router