/**
 * Init tasks state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val() && data.val().tasks) {
    state.tasks = Object.values(data.val().tasks);
  } else {
    state.tasks = [];
  }
};

/**
 * Add a task
 *
 * @param {state} object the vuex state object.
 * @param {projectId} string which represents project's id
 * @param {deadlineId} string which represents deadline's id
 * @param {taskId} string which represents task's id
 * @param {taskName} string which represents task's name
 * @param {taskDescription} string which represents task's description
 */
const ADD_TASK = (state, {
  projectId,
  deadlineId,
  taskId,
  taskName,
  taskDescription,
}) => {
  state.tasks.push({
    projectId,
    deadlineId,
    id: taskId,
    name: taskName,
    description: taskDescription,
    completed: false,
    workingOn: false,
  });
};

export {
  INIT_STATE,
  ADD_TASK,
};
