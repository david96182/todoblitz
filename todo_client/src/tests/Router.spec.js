import { mount } from '@vue/test-utils';
import { createRouter, createWebHashHistory } from 'vue-router';
import DummyComponent from '../components/DummyComponent.vue';

describe('Routes', () => {
  it('navigates to /all', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/all', name: 'all', component: DummyComponent },
        { path: '/', redirect: '/all' },
      ],
    });

    router.push('/all');
    await router.isReady();
    const wrapper = mount(DummyComponent, { global: { plugins: [router] } });

    expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
  });

  it('navigates to /active', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/active', name: 'active', component: DummyComponent },
        { path: '/', redirect: '/all' },
      ],
    });

    router.push('/active');
    await router.isReady();
    const wrapper = mount(DummyComponent, { global: { plugins: [router] } });

    expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
  });

  it('navigates to /completed', async () => {
    const router = createRouter({
      history: createWebHashHistory(),
      routes: [
        { path: '/completed', name: 'completed', component: DummyComponent },
        { path: '/', redirect: '/all' },
      ],
    });

    router.push('/completed');
    await router.isReady();
    const wrapper = mount(DummyComponent, { global: { plugins: [router] } });

    expect(wrapper.findComponent(DummyComponent).exists()).toBe(true);
  });
});

