/**
 * Get tasks's list
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains all tasks.
 */
const getTasks = (state) => state.tasks;

/**
 * Get the working on tasks
 *
 * @param {state} object the vuex state object.
 * @return {Array} array of objects that contains working on tasks.
 */
const getWorkingOnTasks = (state) => state.tasks
  .filter((task) => task.workingOn && !task.completed);

export {
  getTasks,
  getWorkingOnTasks,
};
