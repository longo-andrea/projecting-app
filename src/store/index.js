import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

/* eslint no-shadow: ["error", { "allow": ["state"] }] */
const state = {
  projects: [
  ],
  settings: {
    project: {
      maxDeadlines: 3,
    },
  },
};

export const getters = {
  /**
   * Get projects list
   *
   * @param {state} object the vuex state object.
   * @return {Array} array of objects that contains all projects
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
   * @return {Array} array of objects that contains working on projects
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
   * Get completed projects
   *
   * @param {state} object the vuex state object.
   * @return {Array} array of objects that contains completed projects
   */
  getCompletedProjects: (state) => {
    const completedProjects = [];
    if (state.projects) {
      state.projects.forEach((project) => {
        if (project.completed) {
          completedProjects.push({
            id: project.id,
            name: project.name,
            infos: project.infos,
          });
        }
      });
    }

    return completedProjects;
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
  /**
   * Return a function that check whether given deadline is completed
   *
   * @param {state} object the vuex state object.
   * @return {Function} which return if given deadline fot given project is completed
   */
  isDeadlineCompleted: (state) => (projectId, deadlineId) => {
    if (state.projects[projectId]) {
      if (state.projects[projectId].deadlines.find((deadline) => deadline.id === deadlineId).completed === true) {
        return true;
      }
    }
    return false;
  },
};

export const mutations = {
  /**
   * Set selected project as completed
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  completeProject: (state, {
    projectId,
  }) => {
    if (state.projects[projectId]) {
      /* eslint-disable no-param-reassign */
      state.projects[projectId].completed = true;
    }
  },
  /**
   * Unset selected project as completed
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  uncompleteProject: (state, {
    projectId,
  }) => {
    if (state.projects[projectId]) {
      /* eslint-disable no-param-reassign */
      state.projects[projectId].completed = false;
    }
  },
  /**
   * Set all selected project's deadlines as completed
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  completeProjectDeadlines: (state, {
    projectId,
  }) => {
    if (state.projects[projectId].deadlines) {
      state.projects[projectId].deadlines.forEach((deadline) => {
        deadline.completed = true;
      });
    }
  },
  /**
   * Set all selected project's tasks as completed and unWorkingOn
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  completeProjectTasks: (state, {
    projectId,
  }) => {
    if (state.projects[projectId].tasks) {
      state.projects[projectId].tasks.forEach((task) => {
        task.completed = true;
        task.workingOn = false;
      });
    }
  },
  /**
   * Set selected deadline as completed
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   * @param {deadlineId} number represents deadline's id
   */
  completeDeadline: (state, {
    projectId,
    deadlineId,
  }) => {
    // set deadline as completed
    if (state.projects[projectId].deadlines) {
      state.projects[projectId].deadlines.forEach((deadline) => {
        if (deadline.id === deadlineId) {
          /* eslint-disable no-param-reassign */
          deadline.completed = true;
        }
      });
    }
  },
  /**
   * Unset selected deadline's tasks as wnorking On
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   * @param {deadlineId} number represents deadline's id
   */
  unworkingOnDeadlineTasks: (state, {
    projectId,
    deadlineId,
  }) => {
    if (state.projects[projectId].tasks) {
      state.projects[projectId].tasks.forEach((task) => {
        if (task.deadlineIndex === deadlineId) {
          /* eslint-disable no-param-reassign */
          task.workingOn = false;
        }
      });
    }
  },
  /**
   * Unset selected deadline as completed and unmark all its tasks as Working On
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number represents the project's id.
   * @param {deadlineId} number represents deadline's id
   */
  uncompleteDeadline: (state, {
    projectId,
    deadlineId,
  }) => {
    // set deadline as completed
    if (state.projects[projectId].deadlines) {
      state.projects[projectId].deadlines.forEach((deadline) => {
        if (deadline.id === deadlineId) {
          /* eslint-disable no-param-reassign */
          deadline.completed = false;
        }
      });
    }
  },
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
    state.projects.forEach((project) => {
      if (project.id === projectId) {
        project.tasks.forEach((task) => {
          if (task.id === taskId) {
            if (!state.projects[projectId].deadlines[task.deadlineIndex].completed) {
              if (!task.completed) {
                Vue.set(task, 'workingOn', true);
              } else {
                throw new Error('You can\'t set a task as working on if it is already completed!');
              }
            } else {
              throw new Error('You can\'t set a task as working on if dealines is completed!');
            }
          }
        });
      }
    });
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
   * Delete given project
   *
   * @param {state} object the vuex state object.
   * @param {projectId} string that represents the project's id.
   */

  deleteProject: (state, {
    projectId,
  }) => {
    if (projectId !== undefined) {
      state.projects = state.projects.filter((project) => project.id !== projectId);
    }
  },
  editProject: (state, {
    projectId,
    projectName,
    projectDescription,
  }) => {
    if (projectId !== undefined
      && projectName !== ''
      && projectDescription !== '') {
      const projectIndex = state.projects
        .findIndex((project) => project.id === projectId);

      if (projectIndex > -1) {
        state.projects[projectIndex].name = projectName;
        state.projects[projectIndex].infos[0] = projectDescription;
      }
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
  /**
   * Delete specified task
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number that represents the task's project id
   * @param {taskId} number that represent the task's id
   */
  deleteTask: (state, {
    projectId,
    taskId,
  }) => {
    if (taskId !== undefined
      && projectId !== undefined) {
      const taskIndex = state.projects[projectId].tasks
        .findIndex((task) => task.id === taskId);

      if (taskIndex > -1) {
        state.projects[projectId].tasks.splice(taskIndex, 1);
      }
    }
  },
  /**
   * Edit specified task
   *
   * @param {state} object the vuex state object.
   * @param {projectId} number that represents the task's project id
   * @param {taskId} number that represent the task's id
   * @param {taskName} String that represent new task's name
   * @param {taskDescription} String that represent new task's description
   */
  editTask: (state, {
    projectId,
    taskId,
    taskName,
    taskDescription,
  }) => {
    if (projectId !== undefined
        && taskId !== undefined
        && taskName !== ''
        && taskDescription !== '') {
      const taskIndex = state.projects[projectId].tasks
        .findIndex((task) => task.id === taskId);

      if (taskIndex > -1) {
        state.projects[projectId].tasks[taskIndex].name = taskName;
        state.projects[projectId].tasks[taskIndex].description = taskDescription;
      }
    }
  },
  /**
   * Set max deadline for project
   *
   * @param {state} object the vuex state object.
   * @param {maxDeadlinesCount} number that represents the deadlines's count.
   */
  updateMaxDeadlinesSetting: (state, { maxDeadlinesCount }) => {
    if (maxDeadlinesCount > 0 && maxDeadlinesCount < 7) {
      state.settings.project.maxDeadlines = maxDeadlinesCount;
    }
  },
  initialiseStore(state) {
    if (localStorage.getItem('store')) {
      this.replaceState(
        Object.assign(state, JSON.parse(localStorage.getItem('store'))),
      );
    }
  },
};

export const actions = {
  /**
   * Set selected project as completed and all its deadlines and tasks
   * are marked as completed
   *
   * @param {commit} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  completeProject({ commit }, projectId) {
    commit('completeProject', { projectId });
    commit('completeProjectDeadlines', { projectId });
    commit('completeProjectTasks', { projectId });
  },
  /**
   * Set selected project as completed and all its deadlines and tasks
   * are marked as completed
   *
   * @param {commit} object the vuex state object.
   * @param {projectId} number represents the project's id.
   */
  completeDeadline({ commit }, { projectId, deadlineId }) {
    commit('completeDeadline', { projectId, deadlineId });
    commit('unworkingOnDeadlineTasks', { projectId, deadlineId });
  },
};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
