/**
 * Get tasks's list
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains all tasks.
 */
const getTasks = (state) => {
  if (state.tasks) {
    return state.tasks;
  }
  return [];
};

/**
 * Get the working on tasks
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains working on tasks.
 */
const getWorkingOnTasks = (state) => {
  if (state.tasks) {
    return state.tasks
      .filter((task) => task.workingOn && !task.completed);
  }
  return [];
};

/**
 * Get completed tasks
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains completed tasks.
 */
const getCompletedTasks = (state) => {
  if (state.tasks) {
    return state.tasks
      .filter((task) => task.completed);
  }
  return [];
};

export {
  getTasks,
  getWorkingOnTasks,
  getCompletedTasks,
};
