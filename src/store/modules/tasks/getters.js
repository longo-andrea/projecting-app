/**
 * Get user tasks
 *
 * @param {state} object the vuex state object
 * @return {object} which contains user's tasks
 */
const getTasks = (state) => state.tasks;

export {
  /* eslint-disable */
  getTasks,
};