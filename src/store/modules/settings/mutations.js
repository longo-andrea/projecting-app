/**
 * Set current user session
 *
 * @param {state} object the vuex state object.
 * @param {session} object that represent current user session
 */
const SET_USER_SESSION = (state, session) => {
  state.user.session = session;
};

export {
  /* eslint-disable */
  SET_USER_SESSION,
};