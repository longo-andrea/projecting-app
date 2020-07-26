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
 * @param {deadlineDate} date which contains deadline's date
 */
const ADD_DEADLINE = (state, { projectId, deadlineId, deadlineDate }) => {
  state.deadlines.push({
    projectId,
    id: deadlineId,
    date: deadlineDate,
    completed: false,
  });
};

/**
 * Delete given deadline
 *
 * @param {state} object the vuex state object.
 * @param {deadlineId} string which represents deadline's id
 */
const DELETE_DEADLINE = (state, { deadlineId }) => {
  const deadlineIndex = state.deadlines.findIndex((deadline) => deadline.id === deadlineId);

  state.deadlines.splice(deadlineIndex, 1);
};

export {
  INIT_STATE,
  ADD_DEADLINE,
  DELETE_DEADLINE,
};
