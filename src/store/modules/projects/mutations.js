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

export {
  INIT_STATE,
  ADD_PROJECT,
};
