import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  projects: [
    {
      id: 0,
      name: 'Project 1',
      infos: ['project infos will be here'],
      completed: false,
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
          date: '2020-03-12',
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
          deadlineIndex: 0,
          completed: true,
          workingOn: false,
        },
      ],
    },
    {
      id: 1,
      name: 'Project 2',
      infos: ['project infos will be here'],
      completed: false,
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
};

export const getters = {
  /**
   * Get projects list
   *
   * @param {state} object the vuex state object.
   * @return {Array} array of objects that represents the projects
   */
  getProjects: (state) => {
    const projects = [];
    if (state.projects) {
      state.projects.forEach((project) => projects.push(project));
    }
    return projects;
  },
  /**
   * Get active projects
   *
   * @param {state} object the vuex state object.
   * @return {Array} array of objects that contains working on tasks' information.
   */
  getActiveProjects: (state) => {
    const activeProjects = [];
    if (state.projects) {
      state.projects.forEach((project) => {
        if (!project.completed) {
          activeProjects.push({
            id: project.id,
            name: project.name,
            infos: project.infos,
          });
        }
      });
    }
    return activeProjects;
  },
  /**
   * Get the working on tasks
   *
   * @param {state} object the vuex state object.
   * @return {Array} array of objects that contains projects information.
   */
  getWorkingOnTasks: (state) => {
    const workingOnTasks = [];
    if (state.projects) {
      state.projects.forEach((project) => {
        if (project.tasks) {
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
        }
      });
    }
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
    if (state.projects) {
      state.projects.forEach((project) => {
        if (project.deadlines) {
          const incomingDeadline = project.deadlines.find((deadline) => !deadline.completed);
          if (incomingDeadline) {
            incomingDeadlines.push({
              projectId: project.id,
              projectName: project.name,
              deadlineId: incomingDeadline.id,
              deadlineDate: incomingDeadline.date,
            });
          }
        }
      });
    }
    return incomingDeadlines;
  },
};

export const mutations = {
  /**
   * Set selected task as completed
   *
   * @param {state} object the vuex state object.
   * @param {name} string the task's name.
   */
  completeTask: (state, {
    projectId,
    taskId,
  }) => {
    for (let i = 0; i < state.projects.length; i += 1) {
      if (state.projects[i].id === projectId) {
        for (let j = 0; j < state.projects[i].tasks.length; j += 1) {
          if (state.projects[i].tasks[j].id === taskId) {
            /* eslint-disable no-param-reassign */
            state.projects[i].tasks[j].completed = true;
            state.projects[i].tasks[j].workingOn = false;
            break;
          }
        }
        break;
      }
    }
  },
  /**
   * Unset task as complete
   *
   * @param {state} object the vuex state object.
   * @param { projectId } number which represents task's project id
   * @param { taskId } number which represent task's id
   */
  uncompleteTask: (state, {
    projectId,
    taskId,
  }) => {
    for (let i = 0; i < state.projects.length; i += 1) {
      if (state.projects[i].id === projectId) {
        for (let j = 0; j < state.projects[i].tasks.length; j += 1) {
          if (state.projects[i].tasks[j].id === taskId) {
            /* eslint-disable no-param-reassign */
            state.projects[i].tasks[j].completed = false;
            break;
          }
        }
        break;
      }
    }
  },
  /**
   * Set task as working on
   *
   * @param {state} object the vuex state object.
   * @param { projectId } number which represents task's project id
   * @param { taskId } number which represent task's id
   */
  workingOnTask: (state, {
    projectId,
    taskId,
  }) => {
    for (let i = 0; i < state.projects.length; i += 1) {
      if (state.projects[i].id === projectId) {
        for (let j = 0; j < state.projects[i].tasks.length; j += 1) {
          if (state.projects[i].tasks[j].id === taskId) {
            /* eslint-disable no-param-reassign */
            state.projects[i].tasks[j].workingOn = true;
            break;
          }
        }
        break;
      }
    }
  },
  /**
   * Unset task as working on
   *
   * @param {state} object the vuex state object.
   * @param { projectId } number which represents task's project id
   * @param { taskId } number which represent task's id
   */
  unworkingOnTask: (state, {
    projectId,
    taskId,
  }) => {
    for (let i = 0; i < state.projects.length; i += 1) {
      if (state.projects[i].id === projectId) {
        for (let j = 0; j < state.projects[i].tasks.length; j += 1) {
          if (state.projects[i].tasks[j].id === taskId) {
            /* eslint-disable no-param-reassign */
            state.projects[i].tasks[j].workingOn = false;
            break;
          }
        }
        break;
      }
    }
  },
  /**
   * Add a new project with given parameters
   *
   * @param {state} object the vuex state object.
   * @param {projectName} string that represents the project's name.
   * @param {projectInfos} string that represents the project's description.
   * @param {projectDeadlines} array that contains the project's deadlines.
   */
  addProject: (state, {
    projectName,
    projectInfos,
    projectDeadlines,
  }) => {
    if (projectName !== undefined
      && projectInfos !== undefined
      && projectDeadlines !== undefined) {
      const projectId = state.projects.length;
      const deadlines = projectDeadlines.map((deadline) => (
        {
          id: deadline.key,
          date: deadline.date,
          completed: false,
        }
      ));
      state.projects.push({
        id: projectId,
        name: projectName,
        infos: [projectInfos],
        completed: false,
        deadlines,
        tasks: [],
      });
    }
  },
  /**
   * Add a new task with given parameters
   *
   * @param {state} object the vuex state object.
   * @param {taskName} string that represents the task's name.
   * @param {taskDescription} string that represents the tasks's description.
   * @param {projectId} number that represents the task's project id
   * @param {deadlineId} number that represent the task's deadline id
   */
  addTask: (state, {
    taskName,
    taskDescription,
    projectId,
    deadlineId,
  }) => {
    if (taskName !== undefined
      && taskDescription !== undefined
      && projectId !== undefined
      && deadlineId !== undefined) {
      const currentProject = state.projects[projectId];
      const taskId = currentProject.tasks.length;
      currentProject.tasks.push({
        id: taskId,
        name: taskName,
        description: taskDescription,
        deadlineIndex: deadlineId,
        completed: false,
        workingOn: false,
      });
    }
  },
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
});
