import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    projects: [
      {
        id: 0,
        name: 'Project 1',
        info: ['project infos will be here'],
        deadlines: [
          {
            id: 0,
            date: '2020-03-16',
            completed: true,
          },
          {
            id: 1,
            date: '2020-03-18',
            completed: false,
          },
          {
            id: 2,
            date: '2020-03-120',
            completed: false,
          },
          {
            id: 3,
            date: '2020-03-24',
            completed: false,
          },
        ],
        tasks: [
          {
            id: 0,
            name: 'Task 1',
            description: 'I have to finish this tasks!',
            deadlineIndex: 0,
            completed: false,
            workingOn: true,
          },
          {
            id: 1,
            name: 'Task 2',
            description: 'I have to finish this tasks!',
            deadlineIndex: 2,
            completed: false,
            workingOn: false,
          },
          {
            id: 2,
            name: 'Task 3',
            description: 'I have to finish this tasks!',
            deadlineIndex: 3,
            completed: false,
            workingOn: true,
          },
        ],
      },
      {
        id: 1,
        name: 'Project 2',
        info: ['project infos will be here'],
        deadlines: [
          {
            id: 0,
            date: '2020-03-16',
            completed: true,
          },
          {
            id: 1,
            date: '2020-03-18',
            completed: false,
          },
          {
            id: 2,
            date: '2020-03-120',
            completed: false,
          },
          {
            id: 3,
            date: '2020-03-24',
            completed: false,
          },
        ],
        tasks: [
          {
            id: 0,
            name: 'Task 1',
            description: 'I have to finish this tasks!',
            deadlineIndex: 0,
            completed: false,
            workingOn: false,
          },
          {
            id: 1,
            name: 'Task 2',
            description: 'I have to finish this tasks!',
            deadlineIndex: 2,
            completed: false,
            workingOn: true,
          },
          {
            id: 2,
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
    completeTask(state, { projectId, taskId }) {
      for (let i = 0; i < state.projects.length; i += 1) {
        if (state.projects[i].id === projectId) {
          for (let j = 0; j < state.projects[i].tasks.length; j += 1) {
            if (state.projects[i].tasks[j].id === taskId) {
              state.projects[i].tasks[j].completed = true;
              state.projects[i].tasks[j].workingOn = false;
              break;
            }
          }
          break;
        }
      }
    },
  },
  getters: {
    /**
     * Get the working on tasks
     *
     * @param {state} object the vuex state object.
     * @return {Array} array of objects that contains working on tasks' information.
     */
    getWorkingOnTasks: (state) => {
      const workingOnTasks = [];
      state.projects.forEach((project) => {
        project.tasks.forEach((task) => {
          if (!task.completed && task.workingOn) {
            workingOnTasks.push({
              projectId: project.id,
              projectName: project.name,
              taskId: task.id,
              taskName: task.name,
              taskDescription: task.description,
              taskDeadline: project.deadlines[task.deadlineIndex].date,
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
    getIncomingDeadlines: (state) => {
      const incomingDeadlines = [];
      state.projects.forEach((project) => {
        const incomingDeadline = project.deadlines.find((deadline) => !deadline.completed);
        incomingDeadlines.push({
          projectName: project.name,
          deadlineId: incomingDeadline.id,
          deadlineDate: incomingDeadline.date,
        });
      });
      return incomingDeadlines;
    },
  },
});

export default store;
