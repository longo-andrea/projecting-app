/**
 * Get lastDeadlineIndex
 *
 * @param {state} object the vuex state object.
 * @return {Number} number which represents the last deadline's index.
 */
const getDeadlineIndex = (state) => state.lastDeadlineIndex;

/**
 * Get deadlines's list
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains all deadlines.
 */
const getDeadlines = (state) => state.deadlines;

/**
 * Get uncompleted deadlines
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains uncompleted deadlines.
 */
const getUncompletedDeadline = (state) => state.deadlines
  .filter((deadline) => !deadline.completed);

export {
  getDeadlineIndex,
  getDeadlines,
  getUncompletedDeadline,
};
