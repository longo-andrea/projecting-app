/**
 * Get user tasks
 *
 * @param {state} object the vuex state object
 * @return {object} which contains user's tasks
 */
const getTasks = (state) => state.tasks;

/**
 * Get task from specified project id
 *
 * @param {state} object the vuex state object
 * @return {function} which requires project's id and return its tasks
 */
const getProjectTasks = (state) => (projectId) => state.tasks.filter((task) => task.projectId === projectId);

/**
 * Get task from specified deadline id
 *
 * @param {state} object the vuex state object
 * @return {function} which requires deadline's id and return its tasks
 */
const getDeadlineTasks = (state) => (deadlineId) => state.tasks.filter((task) => task.deadlineId === deadlineId);

export {
  getTasks,
  getProjectTasks,
  getDeadlineTasks,
};
