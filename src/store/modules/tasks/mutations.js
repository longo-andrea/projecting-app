import Vue from 'vue';

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

/**
 * Set task completion state
 *
 * @param {state} object the vuex state object.
 * @param {taskId} string which represents task's id
 * @param {completed} boolean which represents task's completion state
 */
const SET_TASK_COMPLETED = (state, { taskId, completed }) => {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  Vue.set(state.tasks[taskIndex], 'completed', completed);
};

/**
 * Set task working on state
 *
 * @param {state} object the vuex state object.
 * @param {taskId} string which represents task's id
 * @param {workingOn} boolean which represents task's working on state
 */
const SET_TASK_WORKINGON = (state, { taskId, workingOn }) => {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  Vue.set(state.tasks[taskIndex], 'workingOn', workingOn);
};

/**
 * Set task name
 *
 * @param {state} object the vuex state object.
 * @param {taskId} string which represents task's id
 * @param {taskName} string which represents new task's name
 */
const SET_TASK_NAME = (state, { taskId, taskName }) => {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  Vue.set(state.tasks[taskIndex], 'name', taskName);
};

/**
 * Set task description
 *
 * @param {state} object the vuex state object.
 * @param {taskId} string which represents task's id
 * @param {taskDescription} string which represents new task's description
 */
const SET_TASK_DESCRIPTION = (state, { taskId, taskDescription }) => {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  Vue.set(state.tasks[taskIndex], 'description', taskDescription);
};

/**
 * Delete given task
 *
 * @param {state} object the vuex state object.
 * @param {taskId} string which represents task's id
 */
const DELETE_TASK = (state, { taskId }) => {
  const taskIndex = state.tasks.findIndex((task) => task.id === taskId);

  state.tasks.splice(taskIndex, 1);
};

export {
  INIT_STATE,
  ADD_TASK,
  SET_TASK_COMPLETED,
  SET_TASK_WORKINGON,
  SET_TASK_NAME,
  SET_TASK_DESCRIPTION,
  DELETE_TASK,
};
