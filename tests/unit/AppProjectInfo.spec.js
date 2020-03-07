import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppProjectInfo from '../../src/components/AppProjectInfo.vue';

describe('AppProjectInfo', () => {
  it('has no props data', () => {
    const wrapper = shallowMount(AppProjectInfo, {
      propsData: {},
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.project-title').exists() && wrapper.find('.project-info').exists()).to.be.false;
  });
  it('has project name', () => {
    const projectName = 'Test Project';
    const wrapper = shallowMount(AppProjectInfo, {
      propsData: {
        name: projectName,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.project-title').text()).to.equals(projectName);
  });
  it('has project infos', () => {
    const projectInfos = ['Here will go projec infos.'];
    const wrapper = shallowMount(AppProjectInfo, {
      propsData: {
        infos: projectInfos,
      },
    });
    /* eslint-disable no-unused-expressions */
    expect(wrapper.find('.project-info').text()).to.equals(projectInfos[0]);
  });
});