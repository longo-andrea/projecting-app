/**
 * Set selected deadline's completed state, and whether is true complete project's deadlines
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {completed} boolean represents completed state.
 */
const setMaxDeadlines = ({ commit }, { maxDeadlones }) => {
  commit('SET_MAX_DEADLINES', { maxDeadlones });
};

/**
 * Set selected deadline's completed state, and whether is true complete project's deadlines
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {completed} boolean represents completed state.
 */
const setUserLoggedIn = ({ commit }, { isLoggedIn }) => {
  commit('SET_LOGGEDIN', { isLoggedIn });
};

export {
  setMaxDeadlines,
  setUserLoggedIn,
};
