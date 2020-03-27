import * as actions from './actions';
import * as getters from './getters';
import * as mutations from './mutations';

const state = {
  tasks: [
    {
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task 1',
      description: 'Task description',
      completed: false,
      workingOn: true,
    },
    {
      projectId: 0,
      deadlineId: 0,
      id: 1,
      name: 'Task 2',
      description: 'Task description',
      completed: false,
      workingOn: true,
    },
  ],
  lastTaskIndex: 1,
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
