/**
 * Add a new project with given parameters
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {projectName} string that represents the project's name
 * @param {projectDescription} string that represents the project's description.
 */
const ADD_PROJECT = (state, projectId, projectName, projectDescription) => {
  if (projectId !== undefined
    && projectDescription !== '') {
    state.projects.push({
      id: projectId,
      name: projectName,
      infos: [
        {
          description: projectDescription,
        },
      ],
      completed: false,
    });

    /* eslint-disable no-param-reassign */
    state.lastProjectIndex += 1;
  }
};

/**
 * Set project's completed state
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number which represents task's project id
 * @param {completed} boolean which represents completed state
 */
const SET_PROJECT_COMPLETED = (state, { projectId, completed }) => {
  if (projectId !== undefined
    && completed !== undefined) {
    const projectIndex = state.projects.findIndex((project) => project.id === projectId);

    if (projectIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.projects[projectIndex].completed = completed;
    }
  }
};

const INITIALIZE_STORE = function (state) {
  if (localStorage.getItem('projects_store')) {
    this.replaceState(
      Object.assign(state, JSON.parse(localStorage.getItem('projects_store'))),
    );
  }
};

export {
  ADD_PROJECT,
  SET_PROJECT_COMPLETED,
  INITIALIZE_STORE,
};
