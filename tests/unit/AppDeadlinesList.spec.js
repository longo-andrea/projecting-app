import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import AppDeadlinesList from '../../src/components/AppDeadlinesList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppDeadlinesList', () => {
  it('has no card if deadlines is all completed', () => {
    const wrapper = shallowMount(AppDeadlinesList, {
      localVue,
      computed: {
        incomingDeadlines: () => [],
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('el-card').exists()).to.be.false;
  });
  it('has a card', () => {
    const wrapper = shallowMount(AppDeadlinesList, {
      localVue,
      computed: {
        incomingDeadlines: () => ({
          id: 0,
          projectName: 'Test Project',
          deadlineDate: '2020-03-05',
        }),
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('el-card').exists()).to.be.true;
  });
});
