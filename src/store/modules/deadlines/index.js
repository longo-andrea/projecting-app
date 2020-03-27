import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  deadlines: [
    {
      projectId: 0,
      id: 0,
      date: new Date(Date.now()),
      completed: false,
    },
  ],
  lastDeadlineIndex: 0,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
