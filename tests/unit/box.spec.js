import { shallowMount } from '@vue/test-utils';
import PBox from '@/components/box/index';

describe('Box component', () => {
  describe('Header slot not passed', () => {
    const wrapper = shallowMount(PBox, {
      slots: {
        content: 'I\'m a content.',
      },
    });

    it('should not renders header', () => {
      expect(wrapper.find('.box__header').exists()).toBe(false);
    });

    it('should renders content', () => {
      expect(wrapper.find('.box__content').text()).toBe('I\'m a content.');
    });
  });

  describe('Header slot passed', () => {
    const wrapper = shallowMount(PBox, {
      slots: {
        header: 'Hello, World! I\'m a header.',
        content: 'I\'m a content.',
      },
    });

    it('should renders header', () => {
      expect(wrapper.find('.box__header').exists()).toBe(true);
      expect(wrapper.find('.box__header').text()).toBe('Hello, World! I\'m a header.');
    });

    it('should renders content', () => {
      expect(wrapper.find('.box__content').text()).toBe('I\'m a content.');
    });
  });
});
