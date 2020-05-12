/**
 * Get deadlines's list
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains all deadlines.
 */
const getDeadlines = (state) => {
  if (state.deadlines) {
    return state.deadlines;
  }
  return [];
};

/**
 * Get completed deadlines
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains completed deadlines.
 */
const getCompletedDeadlines = (state) => {
  if (state.deadlines) {
    return state.deadlines
      .filter((deadline) => deadline.completed);
  }
  return [];
};

/**
 * Get uncompleted deadlines
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains uncompleted deadlines.
 */
const getUncompletedDeadlines = (state) => {
  if (state.deadlines) {
    return state.deadlines
      .filter((deadline) => !deadline.completed);
  }
  return [];
};

export {
  getDeadlines,
  getCompletedDeadlines,
  getUncompletedDeadlines,
};
