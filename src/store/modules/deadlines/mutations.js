/**
 * Init deadline state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val() && data.val().deadlines) {
    state.deadlines = Object.values(data.val().deadlines);
  } else {
    state.deadlines = [];
  }
};

/**
 * Add a deadline
 *
 * @param {state} object the vuex state object.
 * @param {projectId} string which represents project's name
 * @param {deadlines} array which contains deadline's information
 */
const ADD_DEADLINE = (state, { projectId, deadlines }) => {
  state.deadlines.push({
    projectId,
    projectDeadlines: deadlines,
  });
};

export {
  INIT_STATE,
  ADD_DEADLINE,
};
