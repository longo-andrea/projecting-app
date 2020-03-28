import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  deadlines: [],
  lastDeadlineIndex: 0,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
