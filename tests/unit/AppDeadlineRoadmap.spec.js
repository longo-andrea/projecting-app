import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppDeadlineRoadmap from '../../src/components/AppDeadlineRoadmap.vue';

describe('AppDeadlineRoadmap', () => {
  it('first deadline is open by deafault', () => {
    const wrapper = shallowMount(AppDeadlineRoadmap);
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.activeDeadline).to.deep.equal([0]);
  });
  it('getDeadlineTasks should return tasks of specific deadline', () => {
    const tasks = [
      {
        id: 0,
        name: 'Task 1',
        description: 'I have to finish this tasks!',
        deadlineIndex: 0,
        completed: false,
        workingOn: false,
      },
      {
        id: 1,
        name: 'Task 2',
        description: 'I have to finish this tasks!',
        deadlineIndex: 1,
        completed: false,
        workingOn: false,
      },
    ];
    const deadlineId = 0;
    const wrapper = shallowMount(AppDeadlineRoadmap);
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.getDeadlineTasks(tasks, deadlineId)).to.deep.equal([
      {
        id: 0,
        name: 'Task 1',
        description: 'I have to finish this tasks!',
        deadlineIndex: 0,
        completed: false,
        workingOn: false,
      },
    ]);
  });
});
