/**
 * Get lastProjectIndex
 *
 * @param {state} object the vuex state object.
 * @return {Number} number which represents the last project's index.
 */
const getProjectIndex = (state) => state.lastProjectIndex;

/**
 * Get projects's list
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains all projects.
 */
const getProjects = (state) => {
  if (state.projects) {
    return state.projects;
  }
  return [];
};

/**
 * Get completed projects
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains completed projects.
 */
const getCompletedProjects = (state) => {
  if (state.projects) {
    return state.projects
      .filter((project) => project.completed);
  }
  return [];
};

/**
 * Get uncompleted projects
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains uncompleted projects.
 */
const getUnCompletedProjects = (state) => {
  if (state.projects) {
    return state.projects
      .filter((project) => !project.completed);
  }
  return [];
};

export {
  getProjectIndex,
  getProjects,
  getCompletedProjects,
  getUnCompletedProjects,
};
