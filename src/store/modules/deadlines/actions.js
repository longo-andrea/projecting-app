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
 * @param {deadlinesName} string which represents deadline's name
 * @param {deadlineDescription} string which represents deadline's description
 */
const addDeadline = ({ commit }, { deadlineName, deadlineDescription }) => {
  // deadline id is calculated with current timestamp to assuring uniqe id
  const deadlineId = new Date().getTime();

  // deadline is stored locally
  commit('ADD_DEADLINE', { deadlineId, deadlineName, deadlineDescription });

  // then deadline is stored on firebase
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child('deadlines')
    .push() // return a uniqe id to store array in firebase
    .update({
      id: deadlineId,
      name: deadlineName,
      description: deadlineDescription,
    });
};

export {
  initState,
  addDeadline,
};
