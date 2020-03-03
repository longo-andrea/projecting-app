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
      },
      {
        name: 'Task 2',
        description: 'I have to finish this tasks!',
        project: 'Project 2',
        deadline: '2020-03-20',
      },
      {
        name: 'Task 3',
        description: 'I have to finish this tasks!',
        project: 'Project 2',
        deadline: '2020-03-20',
      },
    ],
  },
});

export default store;
