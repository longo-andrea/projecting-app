import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  user: {
    session: null,
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
