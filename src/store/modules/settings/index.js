import * as getters from './getters';

const state = {
  settings: {
    project: {
      maxDeadlines: 3,
    },
  },
};

export default {
  namespaced: true,
  state,
  getters,
};
