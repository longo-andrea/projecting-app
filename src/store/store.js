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
            completed: true,
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
        tasks: [
          {
            name: 'Task 1',
            description: 'I have to finish this tasks!',
            deadlineIndex: 0,
            completed: false,
            workingOn: true,
          },
          {
            name: 'Task 2',
            description: 'I have to finish this tasks!',
            deadlineIndex: 2,
            completed: false,
            workingOn: false,
          },
          {
            name: 'Task 3',
            description: 'I have to finish this tasks!',
            deadlineIndex: 3,
            completed: false,
            workingOn: true,
          },
        ],
      },
      {
        name: 'Project 2',
        info: ['project infos will be here'],
        deadlines: [
          {
            date: '2020-03-16',
            completed: true,
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
        tasks: [
          {
            name: 'Task 1',
            description: 'I have to finish this tasks!',
            deadlineIndex: 0,
            completed: false,
            workingOn: false,
          },
          {
            name: 'Task 2',
            description: 'I have to finish this tasks!',
            deadlineIndex: 2,
            completed: false,
            workingOn: true,
          },
          {
            name: 'Task 3',
            description: 'I have to finish this tasks!',
            deadlineIndex: 3,
            completed: false,
            workingOn: true,
          },
        ],
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
    getWorkingOnTasks: (state) => {
      const workingOnTasks = [];
      state.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          if (!task.completed && task.workingOn) {
            workingOnTasks.push({
              projectName: project.name,
              deadlineId: task.deadlineIndex,
              taskName: task.name,
              taskDescription: task.description,
            });
          }
        });
      });
      return workingOnTasks;
    },
    /**
     * Get the incoming deadlines
     *
     * @param {state} object the vuex state object.
     * @return {Array} an array of objects that containts projects and their next uncompleted deadline
     */
    getIncomingDeadlines: (state) => state.projects.map((project) => {
      const projectDeadline = {
        name: project.name,
      };
      projectDeadline.deadline = project.deadlines.find((deadline) => !deadline.completed).date;
      return projectDeadline;
    }),
  },
});

export default store;
