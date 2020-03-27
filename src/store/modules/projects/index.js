import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  projects: [
    {
      id: 0,
      name: 'Project Test',
      infos: [
        {
          description: 'Test description',
        },
      ],
      completed: false,
    },
  ],
  lastProjectIndex: 1,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
