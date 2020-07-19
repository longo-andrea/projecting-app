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
    .child(`projects/${projectId}`)
    .update({
      id: projectId,
      name: projectName,
      description: projectDescription,
      completed: false,
    });
};

/**
 * Sets the completion state of the project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {complete} bool which represent completion state of the project
 */
const setCompletionState = ({ commit }, { projectId, completed }) => {
  commit('SET_PROJECT_COMPLETION_STATE', { projectId, completed });

  // then update the project state
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}/projects/${projectId}`)
    .update({
      /* eslint-disable object-shorthand */
      completed: completed,
    });
};

/**
 * Sets project name
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {projectName} string which represents project's name
 */
const setProjectName = ({ commit }, { projectId, projectName }) => {
  commit('SET_PROJECT_NAME', { projectId, projectName });

  // then update the project state
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}/projects/${projectId}`)
    .update({
      name: projectName,
    });
};

/**
 * Sets project name
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 * @param {projectDescription} string which represents project's description
 */
const setProjectDescription = ({ commit }, { projectId, projectDescription }) => {
  commit('SET_PROJECT_DESCRIPTION', { projectId, projectDescription });

  // then update the project state
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}/projects/${projectId}`)
    .update({
      description: projectDescription,
    });
};

/**
 * Delete given project
 *
 * @param {commit} object the vuex state object
 * @param {projectId} string which represents project's id
 */
const deleteProject = ({ commit }, { projectId }) => {
  commit('DELETE_PROJECT', { projectId });

  // then update the project state
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}/projects/${projectId}`)
    .remove();
};

export {
  initState,
  addProject,
  setCompletionState,
  setProjectName,
  setProjectDescription,
  deleteProject,
};
