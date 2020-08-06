import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Login from '@/views/login/index';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const actions = {
  'settings/restoreUserSession': jest.fn(),
  'settings/loginWithGoogle': jest.fn(),
  'projects/initState': jest.fn(),
  'deadlines/initState': jest.fn(),
  'tasks/initState': jest.fn(),
};

const router = new VueRouter();
const store = new Vuex.Store({
  actions,
});

describe('Login component', () => {
  const wrapper = shallowMount(Login, {
    localVue,
    store,
    router,
  });

  it('should trying to restore session when component mounted', () => {
    expect(actions['settings/restoreUserSession']).toHaveBeenCalled();
  });

  it('should login with google', async () => {
    wrapper.find('.login__button input').trigger('click');

    await wrapper.vm.$nextTick();

    expect(actions['settings/loginWithGoogle']).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe('/homepage');
  });
});
