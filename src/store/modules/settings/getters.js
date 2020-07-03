/**
 * Get current user session
 *
 * @param {state} object the vuex state object.
 * @return {object} which represents current user session
 */
const getUserSession = (state) => state.user.session;

export {
  /* eslint-disable */
  getUserSession,
};