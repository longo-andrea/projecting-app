import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import AddProject from '@/views/add-project/index';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const actions = {
  'projects/addProject': jest.fn(),
  'settings/generateUniqeId': jest.fn(),
  'deadlines/addDeadline': jest.fn(),
};

const router = new VueRouter();
const store = new Vuex.Store({
  actions,
});

describe('Add project component', () => {
  const wrapper = mount(AddProject, {
    localVue,
    store,
    router,
  });

  it('should not add project if name and description are empty', async () => {
    wrapper.vm.projectName = '';
    wrapper.vm.projectDescription = '';

    wrapper.findComponent({ name: 'PButton' }).vm.$emit('buttonClicked');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$route.path).toBe('/');
  });

  it('should add project with title and description', async () => {
    wrapper.vm.projectName = 'Project name';
    wrapper.vm.projectDescription = 'Project description';
    wrapper.vm.projectDeadlines = [{
      date: new Date(),
    }];

    wrapper.findComponent({ name: 'PButton' }).vm.$emit('buttonClicked');

    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();
    await wrapper.vm.$nextTick();

    expect(actions['settings/generateUniqeId']).toHaveBeenCalled();
    expect(actions['deadlines/addDeadline']).toHaveBeenCalled();
    expect(wrapper.vm.$route.path).toBe('/homepage/summary');
  });

  it('should add project deadline', async () => {
    wrapper.find('.add-project__form__item__input-date').element.nodeValue = '2020-08-04';
    wrapper.find('.add-project__form__item__input-date').trigger('change');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.projectDeadlines.length).toBe(2);
  });

  it('should remove project deadline', async () => {
    wrapper.find('.add-project__form__item__roadmap__item span').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.projectDeadlines.length).toBe(1);
  });
});
