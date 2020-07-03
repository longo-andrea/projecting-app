import firebase from 'firebase/app';
import 'firebase/auth';

/**
 * Set current user session
 *
 * @param {commit} object the vuex state object
 * @param {session} object that represent current user session
 */
const setUserSession = ({ commit }, session) => {
  commit('SET_USER_SESSION', session);
};

/**
 * Trying to restore current user session
 *
 * @param {commit} object the vuex state object
 * @return {promise}  that represent restoring action result
 */

const restoreUserSession = ({ commit }) => new Promise((resolve, reject) => {
  firebase.auth().onAuthStateChanged((session) => {
    if (session) {
      // store session
      commit('SET_USER_SESSION', session);

      resolve(session);
    } else {
      // set session to null
      commit('SET_USER_SESSION', null);

      reject(new Error('You must be logged in'));
    }
  });
});

/**
 * User is logged out
 *
 * @param {commit} object the vuex state object
 */

const loginWithGoogle = ({ commit }) => new Promise((resolve, reject) => {
  const provider = new firebase.auth.GoogleAuthProvider(); // init GoogleAuthProvider

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((session) => {
      // user session is stored
      commit('SET_USER_SESSION', session);

      resolve();
    })
    .catch((error) => {
      reject(new Error(error));
    });
});

/**
 * User is logged out
 *
 * @param {commit} object the vuex state object
 */

const logout = ({ commit }) => {
  firebase
    .auth()
    .signOut();

  // set session to null
  commit('SET_USER_SESSION', null);
};

export {
  setUserSession,
  restoreUserSession,
  loginWithGoogle,
  logout,
};
