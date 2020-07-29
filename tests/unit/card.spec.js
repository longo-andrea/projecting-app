import { shallowMount } from '@vue/test-utils';
import PCard from '@/components/card/index';

describe('Card component', () => {
  describe('header and content slot passed', () => {
    const wrapper = shallowMount(PCard, {
      slots: {
        header: 'Hello, World! I\'m a header.',
        content: 'I\'m a content.',
      },
    });

    it('should renders header', () => {
      expect(wrapper.find('.card__header').exists()).toBe(true);
      expect(wrapper.find('.card__header').text()).toBe('Hello, World! I\'m a header.');
    });

    it('should renders content', () => {
      expect(wrapper.find('.card__header').exists()).toBe(true);
      expect(wrapper.find('.card__content').text()).toBe('I\'m a content.');
    });
  });
});
