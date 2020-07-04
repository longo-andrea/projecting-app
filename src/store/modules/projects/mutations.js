/**
 * Init projects state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val().projects) {
    Object.assign(state, data.val().projects);
  } else {
    Object.assign(state, {});
  }
};

export {
  /* eslint-disable */
  INIT_STATE,
};