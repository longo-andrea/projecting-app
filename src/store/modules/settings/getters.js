/**
 * Get lastProjectIndex
 *
 * @param {state} object the vuex state object.
 * @return {Number} number which represents the last project's index.
 */
const getMaxDeadlinesForProject = (state) => state.settings.project.maxDeadlines;

/**
 * Get the user auth state
 *
 * @param {state} object the vuex state object.
 * @return {Boolean} whetere the user is logged in or not.
 */
const isUserLoggedIn = (state) => state.user.isLoggedIn;

export {
  getMaxDeadlinesForProject,
  isUserLoggedIn,
};
