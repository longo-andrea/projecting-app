import { shallowMount } from '@vue/test-utils';
import { PCollapseItem } from '@/components/collapse/index';

describe('Collapse item component', () => {
  describe('collapse is not active', () => {
    const wrapper = shallowMount(PCollapseItem, {
      propsData: {
        title: 'Hello, World!',
        isActive: false,
      },
      slots: {
        content: 'Hello, World! I\'m a content!',
      },
    });

    it('should renders title', () => {
      expect(wrapper.find('.collapse-item__header__title').text()).toBe('Hello, World!');
    });

    it('should not renders content', () => {
      expect(wrapper.find('.collapse-item__content').exists()).toBe(false);
    });

    it('should renders content on click', async () => {
      expect(wrapper.find('.collapse-item__content').exists()).toBe(false);

      wrapper.find('.collapse-item__header').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.find('.collapse-item__content').exists()).toBe(true);
    });

    it('should emit an event on click', async () => {
      wrapper.find('.collapse-item__header').trigger('click');
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted().tabOpened).toBeTruthy();
    });
  });

  describe('collapse is active', () => {
    const wrapper = shallowMount(PCollapseItem, {
      propsData: {
        title: 'Hello, World!',
        isActive: true,
      },
      slots: {
        content: 'Hello, World! I\'m a content!',
      },
    });

    it('should renders title', () => {
      expect(wrapper.find('.collapse-item__header__title').text()).toBe('Hello, World!');
    });

    it('should renders content', () => {
      expect(wrapper.find('.collapse-item__content').exists()).toBe(true);
      expect(wrapper.find('.collapse-item__content').text()).toBe('Hello, World! I\'m a content!');
    });

    it('should close content when isActive props change', async () => {
      expect(wrapper.find('.collapse-item__content').exists()).toBe(true);

      wrapper.setProps({ isActive: false });

      await wrapper.vm.$nextTick();

      expect(wrapper.find('.collapse-item__content').exists()).toBe(false);
    });
  });
});
