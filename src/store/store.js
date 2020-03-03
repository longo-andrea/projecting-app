import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    workingOnTasks: [
      {
        name: 'Task 1',
        description: 'I have to finish this tasks!',
        project: 'Project 1',
        deadline: '2020-03-20',
        completed: false,
      },
      {
        name: 'Task 2',
        description: 'I have to finish this tasks!',
        project: 'Project 2',
        deadline: '2020-03-20',
        completed: false,
      },
      {
        name: 'Task 3',
        description: 'I have to finish this tasks!',
        project: 'Project 2',
        deadline: '2020-03-20',
        completed: false,
      },
    ],
  },
  mutations: {
    /**
     * Check selected task as completed
     *
     * @param {state} object the vuex state object.
     * @param {name} string the task's name.
     */
    completeTask(state, name) {
      if (name) {
        // loop until the end or matching the correct task
        let i = 0;
        for (i = 0; i < state.workingOnTasks.length; i += 1) {
          if (name === state.workingOnTasks[i].name) {
            state.workingOnTasks[i].completed = true;
            break;
          }
        }
      }
    },
  },
});

export default store;
