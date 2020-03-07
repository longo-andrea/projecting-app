import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppTask from '../../src/components/AppTask.vue';

describe('AppTask', () => {
  it('has task name', () => {
    const taskName = 'Task 1';
    const wrapper = shallowMount(AppTask, {
      propsData: {
        name: taskName,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.task-title').text()).to.equals(taskName);
  });
  it('has task description', () => {
    const taskDescription = 'I have to finish this task!';
    const wrapper = shallowMount(AppTask, {
      propsData: {
        description: taskDescription,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.task-subtitle').text()).to.equals(taskDescription);
  });
  it('has task project name info', () => {
    const projectName = 'Test project';
    const wrapper = shallowMount(AppTask, {
      propsData: {
        project: projectName,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.task-infos > p:nth-child(1)').text()).to.equals(projectName);
  });
  it('has task deadline date info', () => {
    const deadlineDate = '2020-03-05';
    const wrapper = shallowMount(AppTask, {
      propsData: {
        deadline: deadlineDate,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.task-infos > p:nth-child(2)').text()).to.equals(deadlineDate);
  });
  it('is task information card close as default', () => {
    const wrapper = shallowMount(AppTask);
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.isTaskOpen).to.be.false;
  });
  it('is task information card open after the task name being clicked', () => {
    const wrapper = shallowMount(AppTask);
    /* eslint-disable no-unused-expressions */
    wrapper.find('.task-title').trigger('click');
    expect(wrapper.vm.$data.isTaskOpen).to.be.true;
  });
});
