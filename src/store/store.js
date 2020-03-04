import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    projects: [
      {
        name: 'Project 1',
        info: ['project infos will be here'],
        deadlines: [
          {
            date: '2020-03-16',
            completed: false,
          },
          {
            date: '2020-03-18',
            completed: false,
          },
          {
            date: '2020-03-120',
            completed: false,
          },
          {
            date: '2020-03-24',
            completed: false,
          },
        ],
      },
      {
        name: 'Project 2',
        info: ['project infos will be here'],
        deadlines: [
          {
            date: '2020-03-16',
            completed: false,
          },
          {
            date: '2020-03-18',
            completed: false,
          },
          {
            date: '2020-03-120',
            completed: false,
          },
          {
            date: '2020-03-24',
            completed: false,
          },
        ],
      },
    ],
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
      {
        name: 'Task 4',
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
  getters: {
    /**
     * Get the incoming deadlines
     *
     * @param {state} object the vuex state object.
     * @return {Array} an array of objects that containts projects and their next uncompleted deadline
     */
    getIncogmingDeadlines: (state) => state.projects.map((project) => {
      const projectDeadline = {
        name: project.name,
      };
      projectDeadline.deadline = project.deadlines.find((deadline) => !deadline.completed).date;
      return projectDeadline;
    }),
  },
});

export default store;
