import firebase from 'firebase/app';
import 'firebase/database';

/**
 * Init deadlines state
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
 * Add a new deadlines
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {deadlines} array which contains deadline information
 */
const addDeadline = ({ commit }, { projectId, deadlineId, deadlineDate }) => {
  // deadline is stored locally
  commit('ADD_DEADLINE', { projectId, deadlineId, deadlineDate });

  // then deadline is stored on firebase
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`deadlines/${deadlineId}`)
    .update({
      projectId,
      id: deadlineId,
      date: deadlineDate,
      completed: false,
    });
};

/**
 * Delete given deadline
 *
 * @param {commit} object the vuex state object
 * @param {deadlineId} string which represents deadline's id
 */
const deleteDeadline = ({ commit }, { deadlineId }) => {
  commit('DELETE_DEADLINE', { deadlineId });

  // then the task is removed from database
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`deadlines/${deadlineId}`)
    .remove();
};

/**
 * Delete all deadlines of given project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const deleteProjectDeadlines = ({ getters, dispatch }, { projectId }) => {
  const projectDeadlines = getters.getProjectDeadlines(projectId);

  projectDeadlines.forEach((deadline) => dispatch('deleteDeadline', {
    deadlineId: deadline.id,
  }));
};

/**
 * Set deadline completion state
 *
 * @param {commit} object the vuex state object
 * @param {deadlineId} string which represents deadline's id
 * @param {completed} boolean which represents deadline completion state
 */
const setDeadlineCompleted = ({ commit }, { deadlineId, completed }) => {
  commit('SET_DEADLINE_COMPLETED', { deadlineId, completed });

  // then task is updated
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child(`deadlines/${deadlineId}`)
    .update({
      /* eslint-disable object-shorthand */
      completed: completed,
    });
};

/**
 * Set all project's deadlines as completed
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const completeAllProjectDeadlines = ({ getters, dispatch }, { projectId }) => {
  const projectDeadlines = getters.getProjectDeadlines(projectId);

  projectDeadlines.forEach((deadline) => dispatch('setDeadlineCompleted', {
    deadlineId: deadline.id,
    completed: true,
  }));
};

export {
  initState,
  addDeadline,
  deleteDeadline,
  deleteProjectDeadlines,
  setDeadlineCompleted,
  completeAllProjectDeadlines,
};
