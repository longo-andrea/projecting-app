import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  tasks: [],
  lastTaskIndex: 1,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
