/**
 * Set max deadlines for project
 *
 * @param {state} object the vuex state object.
 * @param {maxDeadlines} number that represents new max deadlines count
 */
const SET_MAX_DEADLINES = (state, { maxDeadlines }) => {
  if (maxDeadlines > 0 && maxDeadlines < 7) {
    /* eslint-disable no-param-reassign */
    state.settings.maxDeadlines = maxDeadlines;
  }
};

/**
 * Set logged in state of the user
 *
 * @param {state} object the vuex state object.
 * @param {isLoggedIn} boolean wheter use is logged in or not
 */
const SET_LOGGEDIN = (state, { isLoggedIn }) => {
  if (isLoggedIn !== undefined) {
    /* eslint-disable no-param-reassign */
    state.user.isLoggedIn = isLoggedIn;
  }
};

export {
  SET_MAX_DEADLINES,
  SET_LOGGEDIN,
};
