import firebase from 'firebase/app';
import 'firebase/database';

/**
 * Init projects state
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
 * Add a new project
 *
 * @param {commit} object the vuex state object
 * @param {projectName} string which represents project's name
 * @param {projectDescription} string which represents project's description
 */
const addProject = ({ commit }, { projectId, projectName, projectDescription }) => {
  // project is stored locally
  commit('ADD_PROJECT', { projectId, projectName, projectDescription });

  // then project is stored on firebase
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .child('projects')
    .push() // return a uniqe id to store array in firebase
    .update({
      id: projectId,
      name: projectName,
      description: projectDescription,
      completed: false,
    });
};

export {
  initState,
  addProject,
};
