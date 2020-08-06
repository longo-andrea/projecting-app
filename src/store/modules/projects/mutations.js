import Vue from 'vue';

/**
 * Init projects state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val() && data.val().projects) {
    state.projects = Object.values(data.val().projects);
  } else {
    state.projects = [];
  }
};

/**
 * Add a project
 *
 * @param {state} object the vuex state object.
 * @param {projectId} string which represents project's id
 * @param {projectName} string which represents project's name
 * @param {projectDescription} string which represents project's description
 */
const ADD_PROJECT = (state, { projectId, projectName, projectDescription }) => {
  state.projects.push({
    id: projectId,
    name: projectName,
    description: projectDescription,
    completed: false,
  });
};

/**
 * Sets the completion state of the project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {complete} bool which represent completion state of the project
 */
const SET_PROJECT_COMPLETION_STATE = (state, { projectId, completed }) => {
  const projectIndex = state.projects.findIndex((project) => project.id === projectId);

  Vue.set(state.projects[projectIndex], 'completed', completed);
};

/**
 * Sets project's name
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {projectName} string which represents new project's name
 */
const SET_PROJECT_NAME = (state, { projectId, projectName }) => {
  const projectIndex = state.projects.findIndex((project) => project.id === projectId);

  Vue.set(state.projects[projectIndex], 'name', projectName);
};

/**
 * Sets project's description
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {projectDescription} string which represents new project's description
 */
const SET_PROJECT_DESCRIPTION = (state, { projectId, projectDescription }) => {
  const projectIndex = state.projects.findIndex((project) => project.id === projectId);

  Vue.set(state.projects[projectIndex], 'description', projectDescription);
};

/**
 * Delete given project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const DELETE_PROJECT = (state, { projectId }) => {
  const projectIndex = state.projects.findIndex((project) => project.id === projectId);

  state.projects.splice(projectIndex, 1);
};

export {
  INIT_STATE,
  ADD_PROJECT,
  SET_PROJECT_COMPLETION_STATE,
  SET_PROJECT_NAME,
  SET_PROJECT_DESCRIPTION,
  DELETE_PROJECT,
};
