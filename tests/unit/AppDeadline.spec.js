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
    expect(wrapper.find('.title').text()).to.equals(projectName);
  });
  it('has deadline date', () => {
    const deadlineDate = new Date('2020-03-09');
    const dateString = `${deadlineDate.getFullYear()}/${deadlineDate.getMonth() + 1}/${deadlineDate.getDate()}`;
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        date: deadlineDate.toString(),
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.description').text()).to.equals(dateString);
  });
});
