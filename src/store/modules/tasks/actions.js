import firebase from 'firebase/app';
import 'firebase/database';

/**
 * Init tasks state
 *
 * @param {commit} object the vuex state object
 */
const initState = ({ commit }) => {
  const userId = firebase.auth().currentUser.uid;

  return firebase
    .database()
    .ref(`users/${userId}`)
    .once('value')
    .then((data) => {
      commit('INIT_STATE', data);
    });
};

/**
 * Add a new task
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {deadlineId} string which represents deadline's id
 * @param {taskId} string which represents task's id
 * @param {taskName} string which represents task's name
 * @param {taskDescription} string which represents task's description
 */
const addTask = ({ commit }, {
  projectId,
  deadlineId,
  taskId,
  taskName,
  taskDescription,
}) => {
  // task is stored locally
  commit('ADD_TASK', {
    projectId,
    deadlineId,
    taskId,
    taskName,
    taskDescription,
  });

  // then task is stored on firebase
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .update({
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
 * @param {commit} object the vuex state object
 * @param {taskId} string which represents task's id
 * @param {completed} boolean which represents task completion state
 */
const setTaskCompleted = ({ commit, dispatch }, { taskId, completed }) => {
  commit('SET_TASK_COMPLETED', { taskId, completed });

  // then task is updated
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .update({
      /* eslint-disable object-shorthand */
      completed: completed,
    });

  // task is unset as Working On
  dispatch('setTaskWorkingOn', { taskId, workingOn: false });
};

/**
 * Set task working on state
 *
 * @param {commit} object the vuex state object
 * @param {taskId} string which represents task's id
 * @param {workingOn} boolean which represents task working on state
 */
const setTaskWorkingOn = ({ commit }, { taskId, workingOn }) => {
  commit('SET_TASK_WORKINGON', { taskId, workingOn });

  // then task is updated
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .update({
      /* eslint-disable object-shorthand */
      workingOn: workingOn,
    });
};

/**
 * Set task name
 *
 * @param {commit} object the vuex state object
 * @param {taskId} string which represents task's id
 * @param {taskName} boolean which represents task's name
 */
const setTaskName = ({ commit }, { taskId, taskName }) => {
  commit('SET_TASK_NAME', { taskId, taskName });

  // then the task is updated
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .update({
      /* eslint-disable object-shorthand */
      name: taskName,
    });
};

/**
 * Set task description
 *
 * @param {commit} object the vuex state object
 * @param {taskId} string which represents task's id
 * @param {taskDescription} boolean which represents task's description
 */
const setTaskDescription = ({ commit }, { taskId, taskDescription }) => {
  commit('SET_TASK_DESCRIPTION', { taskId, taskDescription });

  // then the task is updated
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .update({
      /* eslint-disable object-shorthand */
      description: taskDescription,
    });
};

/**
 * Delete given task
 *
 * @param {commit} object the vuex state object
 * @param {taskId} string which represents task's id
 */
const deleteTask = ({ commit }, { taskId }) => {
  commit('DELETE_TASK', { taskId });

  // then the task is removed from database
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`tasks/${taskId}`)
    .remove();
};

/**
 * Delete all tasks of given project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const deleteProjectTasks = ({ getters, dispatch }, { projectId }) => {
  const projectTasks = getters.getProjectTasks(projectId);

  projectTasks.forEach((task) => dispatch('deleteTask', {
    taskId: task.id,
  }));
};

/**
 * Set all project's tasks as completed
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const completeAllProjectTasks = ({ getters, dispatch }, { projectId }) => {
  const projectTasks = getters.getProjectTasks(projectId);

  projectTasks.forEach((task) => dispatch('setTaskCompleted', {
    taskId: task.id,
    completed: true,
  }));
};

export {
  initState,
  addTask,
  setTaskCompleted,
  setTaskWorkingOn,
  setTaskName,
  setTaskDescription,
  deleteTask,
  deleteProjectTasks,
  completeAllProjectTasks,
};
