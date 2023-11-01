// router.js
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  { path: '/all', name: 'all' },
  { path: '/active', name: 'active' },
  { path: '/completed', name: 'completed' },
  { path: '/', redirect: '/all' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

