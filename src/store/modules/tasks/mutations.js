/**
 * Init tasks state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val().deadlines) {
    Object.assign(state, data.val().tasks);
  } else {
    Object.assign(state, {});
  }
};

export {
  /* eslint-disable */
  INIT_STATE,
};