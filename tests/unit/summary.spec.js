import { mount, shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Summary from '@/views/summary/index';
import QuickTask from '@/views/summary/quick-info/QuickTask.vue';
import QuickDeadline from '@/views/summary/quick-info/QuickDeadline.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

const actions = {
  'tasks/setTaskCompleted': jest.fn(),
};

const emptyStore = new Vuex.Store({
  getters: {
    'projects/getProjects': () => ([]),
    'deadlines/getDeadlines': () => ([]),
    'tasks/getTasks': () => ([]),
  },
});

const populatedStore = new Vuex.Store({
  getters: {
    'projects/getProjects': () => ([
      {
        completed: false,
        description: 'One more project to working on',
        id: 'pj-10141174919222720000',
        name: 'Another project',
      },
    ]),
    'deadlines/getDeadlines': () => ([
      {
        completed: false,
        date: '2020-07-09T00:00:00.000Z',
        id: 'pj-591311787046110000',
        projectId: 'pj-10141174919222720000',
      },
    ]),
    'tasks/getTasks': () => ([
      {
        completed: false,
        deadlineId: 'pj-591311787046110000',
        description: 'Descrizione',
        id: 'pj-6457572966356903000',
        name: 'Primo task aggiunto',
        projectId: 'pj-10141174919222720000',
        workingOn: true,
      },
    ]),
  },
  actions,
});

describe('Summary component', () => {
  describe('there are no projects', () => {
    const wrapper = mount(Summary, {
      localVue,
      store: emptyStore,
      router,
    });

    describe('there are no deadlines and tasks', () => {
      it('should not renders projects', () => {
        expect(wrapper.find('.summary__content__projects-list__item').exists()).toBe(false);
      });

      it('should not renders deadlines', () => {
        expect(wrapper.find('#incoming-deadlines_list .summary__content__summary__tabs__tab__item').exists()).toBe(false);
      });

      it('should not renders tasks', () => {
        expect(wrapper.find('#workingon-tasks-list .summary__content__summary__tabs__tab__item').exists()).toBe(false);
      });
    });
  });

  describe('there are projects', () => {
    const wrapper = mount(Summary, {
      localVue,
      store: populatedStore,
      router,
    });

    describe('there are deadlines and tasks', () => {
      it('should renders projects', () => {
        expect(wrapper.find('.summary__content__projects-list__item').exists()).toBe(true);
      });

      it('should renders deadlines', () => {
        expect(wrapper.find('#incoming-deadlines-list .summary__content__summary__tabs__tab__item').exists()).toBe(true);
      });

      it('should renders tasks', () => {
        expect(wrapper.find('#workingon-tasks-list .summary__content__summary__tabs__tab__item').exists()).toBe(true);
      });
    });

    it('should toggle completed projects list', async () => {
      expect(wrapper.findComponent({ name: 'ProjectsList' }).vm.isUncompletedProjectsOpen).toBe(false);

      wrapper.find('.summary__content__projects-list__completed-projects__toggler').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.findComponent({ name: 'ProjectsList' }).vm.isUncompletedProjectsOpen).toBe(true);
    });

    it('should navigate to project page', async () => {
      wrapper.find('.summary__content__projects - list__item__title').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.$route.path).toBe('/project/pj-10141174919222720000');
    });
  });

  it('should open add project menu', async () => {
    const wrapper = shallowMount(Summary, {
      localVue,
      store: emptyStore,
      router,
    });

    expect(wrapper.vm.isAddMenuOpen).toBe(false);

    wrapper.findComponent({ name: 'PButton' }).vm.$emit('buttonClicked');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isAddMenuOpen).toBe(true);
  });

  it('should toggle active tab', async () => {
    const wrapper = mount(Summary, {
      localVue,
      store: emptyStore,
      router,
    });

    wrapper.findAll('.summary__content__summary__tab-links__item').at(1).trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent({ name: 'QuickInfo' }).vm.activeTab).toBe('Deadlines');
  });

  it('should open task info', async () => {
    const wrapper = shallowMount(QuickTask, {
      localVue,
      store: populatedStore,
      propsData: {
        task: {
          completed: false,
          deadlineId: 'pj-591311787046110000',
          description: 'Descrizione',
          id: 'pj-6457572966356903000',
          name: 'Primo task aggiunto',
          projectId: 'pj-10141174919222720000',
          workingOn: true,
        },
      },
    });

    wrapper.find('.summary__content__summary__tabs__tab__item__header').trigger('click');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isOpen).toBe(true);
  });

  it('should call complete task action', async () => {
    const wrapper = shallowMount(QuickTask, {
      localVue,
      store: populatedStore,
      propsData: {
        task: {
          completed: false,
          deadlineId: 'pj-591311787046110000',
          description: 'Descrizione',
          id: 'pj-6457572966356903000',
          name: 'Primo task aggiunto',
          projectId: 'pj-10141174919222720000',
          workingOn: true,
        },
      },
    });

    wrapper.find('.summary__content__summary__tabs__tab__item__header span').trigger('click');

    await wrapper.vm.$nextTick();

    expect(actions['tasks/setTaskCompleted']).toHaveBeenCalled();
  });

  it('should renders deadline days left', async () => {
    const wrapper = shallowMount(QuickDeadline, {
      localVue,
      store: populatedStore,
      propsData: {
        deadline: {
          completed: false,
          date: (new Date((new Date()).setDate((new Date()).getDate() + 10))).toISOString(),
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.summary__content__summary__tabs__tab__item__header__info').text()).toBe('10 days left');
  });

  it('should renders deadline with one day left', async () => {
    const wrapper = shallowMount(QuickDeadline, {
      localVue,
      store: populatedStore,
      propsData: {
        deadline: {
          completed: false,
          date: (new Date((new Date()).setDate((new Date()).getDate() + 1))).toISOString(),
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.summary__content__summary__tabs__tab__item__header__info').text()).toBe('1 day left');
  });

  it('should renders deadline days passed', async () => {
    const wrapper = shallowMount(QuickDeadline, {
      localVue,
      store: populatedStore,
      propsData: {
        deadline: {
          completed: false,
          date: (new Date((new Date()).setDate((new Date()).getDate() - 10))).toISOString(),
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.summary__content__summary__tabs__tab__item__header__info').text()).toBe('10 days ago');
  });

  it('should renders deadline after one day passed', async () => {
    const wrapper = shallowMount(QuickDeadline, {
      localVue,
      store: populatedStore,
      propsData: {
        deadline: {
          completed: false,
          date: (new Date((new Date()).setDate((new Date()).getDate() - 1))).toISOString(),
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        },
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.summary__content__summary__tabs__tab__item__header__info').text()).toBe('1 day ago');
  });
});
