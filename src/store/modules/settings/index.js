import * as getters from './getters';
import * as mutations from './mutations';
import * as actions from './actions';

const state = {
  settings: {
    project: {
      maxDeadlines: 3,
    },
  },
  user: {
    isLoggedIn: false,
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
