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
    .child('deadlines')
    .push() // return a uniqe id to store array in firebase
    .update({
      projectId,
      id: deadlineId,
      date: deadlineDate,
      completed: false,
    });
};

export {
  initState,
  addDeadline,
};
