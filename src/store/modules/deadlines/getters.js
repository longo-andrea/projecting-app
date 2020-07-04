/**
 * Get user deadlines
 *
 * @param {state} object the vuex state object
 * @return {object} which contains user's deadlines
 */
const getDeadlines = (state) => state.deadlines;

export {
  /* eslint-disable */
  getDeadlines,
};