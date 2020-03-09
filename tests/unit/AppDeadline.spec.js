import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppDeadline from '../../src/components/AppDeadline.vue';

describe('AppDeadline', () => {
  it('has project name', () => {
    const projectName = 'Test Project';
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        project: projectName,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.deadline-title').text()).to.equals(projectName);
  });
  it('has deadline date', () => {
    const deadlineDate = '2020-03-05';
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        date: deadlineDate,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.deadline-date').text()).to.equals(deadlineDate);
  });
});
