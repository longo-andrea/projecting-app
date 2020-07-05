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
 * @param {taskName} string which represents task's name
 * @param {taskDescription} string which represents task's description
 */
const addTask = ({ commit }, { projectId, taskName, taskDescription }) => {
  // task is stored locally
  commit('ADD_TASK', { projectId, taskName, taskDescription });

  // then task is stored on firebase
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child('tasks')
    .push() // return a uniqe id to store array in firebase
    .update({
      projectId,
      name: taskName,
      description: taskDescription,
    });
};

export {
  initState,
  addTask,
};
