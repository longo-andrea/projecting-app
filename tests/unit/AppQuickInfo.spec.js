import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';
import AppQuickInfo from '../../src/components/AppQuickInfo.vue';

describe('AppQuickInfo', () => {
  it('is working on tab actibe by default', () => {
    const wrapper = shallowMount(AppQuickInfo);
    /* eslint-disable no-unused-expressions */
    expect(wrapper.vm.$data.activeTab).to.equals('working-on');
  });
});
