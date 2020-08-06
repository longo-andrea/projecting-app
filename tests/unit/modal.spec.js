import { shallowMount } from '@vue/test-utils';
import PModal from '@/components/modal/index';

describe('Modal component', () => {
  describe('header and content slot passed', () => {
    const wrapper = shallowMount(PModal, {
      slots: {
        header: 'Hello, World! I\'m a header.',
        content: 'I\'m a content.',
      },
    });

    it('should renders header', () => {
      expect(wrapper.find('.modal__panel__header').text()).toBe('Hello, World! I\'m a header.');
    });

    it('should renders content', () => {
      expect(wrapper.find('.modal__panel__content').text()).toBe('I\'m a content.');
    });
  });
});
