/**
 * Init deadline state
 *
 * @param {state} object the vuex state object.
 * @param {data} object that represent current user state
 */
const INIT_STATE = (state, data) => {
  if (data.val().deadlines) {
    state.deadlines = Object.values(data.val().deadlines);
  } else {
    state.deadlines = [];
  }
};

/**
 * Add a deadline
 *
 * @param {state} object the vuex state object.
 * @param {deadlineId} string which represents deadline's name
 * @param {deadlineName} string which represents deadline's name
 * @param {deadlineDescription} string which represents deadline's description
 */
const ADD_DEADLINE = (state, { deadlineId, deadlineName, deadlineDescription }) => {
  state.deadlines.push({
    id: deadlineId,
    name: deadlineName,
    description: deadlineDescription,
  });
};

export {
  INIT_STATE,
  ADD_DEADLINE,
};
