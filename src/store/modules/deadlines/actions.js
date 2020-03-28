/**
 * Add a new deadline with given information
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineDate} date which represents deadlines's date
 */
const addDeadline = ({ commit, getters }, { projectId, deadlineDate }) => {
  const deadlineId = getters.getDeadlineIndex;
  commit('ADD_DEADLINE', { projectId, deadlineId, deadlineDate });
};

/**
 * Set selected deadline's completed state
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents deadline's id.
 * @param {completed} boolean represents completed state.
 */
const setCompletedDeadline = ({ commit }, { projectId, deadlineId, completed }) => {
  commit('SET_DEADLINE_COMPLETED', { projectId, deadlineId, completed });
};

export {
  addDeadline,
  setCompletedDeadline,
};
