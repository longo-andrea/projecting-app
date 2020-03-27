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
const getProjects = (state) => state.projects;

/**
 * Get completed projects
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains completed projects.
 */
const getCompletedProjects = (state) => state.projects
  .filter((project) => project.completed);

/**
 * Get uncompleted projects
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains uncompleted projects.
 */
const getUnCompletedProjects = (state) => state.projects
  .filter((project) => !project.completed);

export {
  getProjectIndex,
  getProjects,
  getCompletedProjects,
  getUnCompletedProjects,
};
