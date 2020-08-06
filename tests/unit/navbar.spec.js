import { shallowMount, createLocalVue } from '@vue/test-utils';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import PNavbar from '@/components/navbar/index';

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();
const store = new Vuex.Store({
  getters: {
    'settings/getUserSession': () => ({
      photoUrl: 'https://via.placeholder.com/150',
    }),
  },
  actions: {
    'settings/logout': () => {},
  },
});

describe('Navabr component', () => {
  const wrapper = shallowMount(PNavbar, {
    localVue,
    router,
    store,
  });

  it('open settings on icon click', () => {
    expect(wrapper.vm.isSettingsOpen).toBe(false);

    wrapper.find('.navbar__settings-icon').trigger('click');

    expect(wrapper.vm.isSettingsOpen).toBe(true);
  });

  it('navigate to home on logo click', async () => {
    wrapper.find('.navbar__logo').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.path).toBe('/homepage/summary');
  });

  it('should logout on button click', async () => {
    wrapper.find('.navbar__settings__list__item').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.path).toBe('/login');
  });
});
