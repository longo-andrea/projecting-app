import firebase from 'firebase/app';
import 'firebase/database';

/**
 * Init projects state
 *
 * @param {commit} object the vuex state object
 */
const initState = ({ commit }) => {
  const userId = firebase.auth().currentUser.uid;

  firebase
    .database()
    .ref(`users/${userId}`)
    .once('value')
    .then((data) => {
      commit('INIT_STATE', data);
    });
};

export {
  /* eslint-disable */
  initState,
};
