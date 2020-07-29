import { shallowMount, config } from '@vue/test-utils';
import PNavbar from '@/components/navbar/index';

describe('Navabr component', () => {
  config.mocks.$store = {
    state: {},
    actions: {},
    getters: {
      'settings/getUserSession': () => ({
        photoUrl: 'https://via.placeholder.com/150',
      }),
    },
  };

  const wrapper = shallowMount(PNavbar);

  it('open settings on icon click', () => {
    expect(wrapper.vm.isSettingsOpen).toBe(false);

    wrapper.find('.navbar__settings-icon').trigger('click');

    expect(wrapper.vm.isSettingsOpen).toBe(true);
  });
});
