/**
 * Get user projects
 *
 * @param {state} object the vuex state object
 * @return {object} which contains user's projects
 */
const getProjects = (state) => state.projects;

/**
 * Get a project by its id
 *
 * @param {state} object the vuex state object
 * @param {id} string which represents id of a project
 * @return {object} which contains requested project
 */
const getProject = (state) => (id) => state.projects.find((project) => project.id === id);

export {
  getProjects,
  getProject,
};
