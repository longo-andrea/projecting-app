import { shallowMount } from '@vue/test-utils';
import PButton from '@/components/button/index';

describe('Button component', () => {
  describe('content slot not passed', () => {
    const wrapper = shallowMount(PButton);

    it('should not renders content', () => {
      expect(wrapper.find('.button').text()).toBe('');
    });
  });

  describe('content slot passed', () => {
    const wrapper = shallowMount(PButton, {
      slots: {
        content: 'I\'m a content.',
      },
    });

    it('should not renders content', () => {
      expect(wrapper.find('.button').text()).toBe('I\'m a content.');
    });

    describe('custom color passed', () => {
      const customWrapper = shallowMount(PButton, {
        propsData: {
          color: 'primary',
        },
        slots: {
          content: 'I\'m a content.',
        },
      });

      it('should add custom color class', () => {
        expect(customWrapper.find('.button--primary').exists()).toBe(true);
      });
    });

    describe('custom size passed', () => {
      const customWrapper = shallowMount(PButton, {
        propsData: {
          size: 'big',
        },
        slots: {
          content: 'I\'m a content.',
        },
      });

      it('should add custom size class', () => {
        expect(customWrapper.find('.button--big').exists()).toBe(true);
      });
    });

    describe('rounded border state passed', () => {
      const customWrapper = shallowMount(PButton, {
        propsData: {
          rounded: true,
        },
        slots: {
          content: 'I\'m a content.',
        },
      });

      it('should add rounded state class', () => {
        expect(customWrapper.find('.button--rounded').exists()).toBe(true);
      });
    });

    describe('disabled state passed', () => {
      const customWrapper = shallowMount(PButton, {
        propsData: {
          disabled: true,
        },
        slots: {
          content: 'I\'m a content.',
        },
      });

      it('should add disabled state class', () => {
        expect(customWrapper.find('.button--disabled').exists()).toBe(true);
      });
    });

    it('should emit event on click', async () => {
      wrapper.find('.button').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().buttonClicked).toBeTruthy();
    });
  });
});
