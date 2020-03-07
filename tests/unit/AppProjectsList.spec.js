import { shallowMount, createLocalVue } from '@vue/test-utils';
import { expect } from 'chai';
import Vuex from 'vuex';
import AppProjectsList from '../../src/components/AppProjectsList.vue';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('AppProjectsList', () => {
  it('has no card if there are not projects', () => {
    const wrapper = shallowMount(AppProjectsList, {
      localVue,
      computed: {
        activeProjects: () => [],
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('el-card').exists()).to.be.false;
  });
  it('has a card', () => {
    const wrapper = shallowMount(AppProjectsList, {
      localVue,
      computed: {
        activeProjects: () => [
          {
            name: 'Test Project',
            infos: ['Here will go project infos.'],
          },
        ],
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('el-card').exists()).to.be.true;
  });
});
