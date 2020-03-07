import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import AppTasksList from '../../src/components/AppTasksList.vue';
import AppTask from '../../src/components/AppTask.vue';


const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppTasksList', () => {
  it('has no card if there are not tasks', () => {
    const wrapper = shallowMount(AppTasksList, {
      localVue,
      computed: {
        workingTasks: () => [],
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find(AppTask).exists()).to.be.false;
  });
  it('has a card', () => {
    const wrapper = shallowMount(AppTasksList, {
      localVue,
      computed: {
        workingTasks: () => [{
          projectId: 0,
          projectName: 'Project',
          taskId: 0,
          taskName: 'Test Task',
          taskDescription: 'I have to complete this task!',
          taskDeadline: '2020-03-05',
        }],
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find(AppTask).exists()).to.be.true;
  });
});
