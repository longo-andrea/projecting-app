/**
 * Add a new project with given parameters
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {projectName} string that represents the project's name
 * @param {projectDescription} string that represents the project's description.
 */
const ADD_PROJECT = (state, { projectId, projectName, projectDescription }) => {
  if (projectId !== undefined
    && projectName !== ''
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
 * Delete given project
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 */
const DELETE_PROJECT = (state, { projectId }) => {
  if (projectId !== undefined) {
    state.projects = state.projects.filter((project) => project.id !== projectId);
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
      state.projects[projectIndex].completed = completed;
    }
  }
};

/**
 * Set project's name of given project
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {projectName} string that represents the project's name
 */
const SET_PROJECT_NAME = (state, { projectId, projectName }) => {
  if (projectId !== undefined
    && projectName !== '') {
    const projectIndex = state.projects.findIndex((project) => project.id === projectId);

    if (projectIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.projects[projectIndex].name = projectName;
    }
  }
};

/**
 * Set project's description of given project
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {projectDescription} string that represents the project's name
 */
const SET_PROJECT_DESCRIPTION = (state, { projectId, projectDescription }) => {
  if (projectId !== undefined
    && projectDescription !== '') {
    const projectIndex = state.projects.findIndex((project) => project.id === projectId);

    if (projectIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.projects[projectIndex].infos[0].description = projectDescription;
    }
  }
};

export {
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_PROJECT_COMPLETED,
  SET_PROJECT_NAME,
  SET_PROJECT_DESCRIPTION,
};
