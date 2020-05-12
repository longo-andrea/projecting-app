/**
 * Set max deadines count per project
 * @param {commit} object the vuex state object.
 * @param {maxDeadlines} number represents max deadlines count.
 */
const setMaxDeadlines = ({ commit }, { maxDeadlines }) => {
  commit('SET_MAX_DEADLINES', { maxDeadlines });
};

/**
 * Set selected user auth state.
 *
 * @param {commit} object the vuex state object.
 * @param {isLoggedIn} boolean wheter the user is logged in or not.
 */
const setUserLoggedIn = ({ commit }, { isLoggedIn }) => Promise.all([
  commit('SET_LOGGEDIN', { isLoggedIn }),
]);

export {
  setMaxDeadlines,
  setUserLoggedIn,
};
