import { shallowMount } from '@vue/test-utils';
import PRoadmap from '@/components/roadmap/index';

describe('Roadmap component', () => {
  describe(('items list empty'), () => {
    const wrapper = shallowMount(PRoadmap, {
      propsData: {
        itemsList: [],
      },
    });

    it('should not renders items', () => {
      expect(wrapper.findAll('.roadmap__list__item')).toHaveLength(0);
    });
  });

  describe(('items list with items'), () => {
    const wrapper = shallowMount(PRoadmap, {
      propsData: {
        itemsList: [
          'Item 1',
          'Item 2',
        ],
      },
    });

    it('should renders items', () => {
      expect(wrapper.findAll('.roadmap__list__item')).toHaveLength(2);
    });
  });
});
