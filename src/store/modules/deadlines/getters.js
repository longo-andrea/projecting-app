/**
 * Get user deadlines
 *
 * @param {state} object the vuex state object
 * @return {object} which contains user's deadlines
 */
const getDeadlines = (state) => state.deadlines;

/**
 * Get all project deadlines
 *
 * @param {state} object the vuex state object
 * @return {function} which requires project's id and return all project's deadlines
 */
const getProjectDeadlines = (state) => (projectId) => state.deadlines.filter((deadline) => deadline.projectId === projectId);

export {
  getDeadlines,
  getProjectDeadlines,
};
