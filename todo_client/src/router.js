// router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import DummyComponent from './components/DummyComponent.vue';

const routes = [
  { path: '/all', name: 'all', component: DummyComponent },
  { path: '/active', name: 'active', component: DummyComponent },
  { path: '/completed', name: 'completed', component: DummyComponent },
  { path: '/', redirect: '/all' },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

