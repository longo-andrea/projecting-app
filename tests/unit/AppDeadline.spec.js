import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppDeadline from '../../src/components/AppDeadline.vue';

describe('AppDeadline', () => {
  it('has project name', () => {
    const projectName = 'Test Project';
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        projectName,
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
        deadlineDate: deadlineDate.toString(),
      },
    });

    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.description').text()).to.equals(dateString);
  });
  it('has days left to next deadline', () => {
    const deadlineDate = new Date(Date.now());
    deadlineDate.setDate(deadlineDate.getDate() + 1);

    const currentDate = new Date(Date.now());
    const timeLeft = Math.abs(deadlineDate - currentDate);
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        deadlineDate: deadlineDate.toString(),
      },
    });

    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.subtitle').text()).to.equals(`${daysLeft} day left`);
  });
  it('has expiration days of deadline', () => {
    const currentDate = new Date(Date.now());
    const deadlineDate = new Date(currentDate.getDate() - 2);

    const timeLeft = Math.abs(deadlineDate - currentDate);
    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    const wrapper = shallowMount(AppDeadline, {
      propsData: {
        deadlineDate: deadlineDate.toString(),
      },
    });

    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.subtitle').text()).to.equals(`${daysLeft} days ago`);
  });
});
