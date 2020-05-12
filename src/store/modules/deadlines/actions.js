/**
 * Add a new deadline with given information
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineDate} date which represents deadlines's date
 */
const addDeadline = ({ commit, getters }, { projectId, deadlineDate }) => {
  const deadlines = getters.getDeadlines
    .filter((deadline) => deadline.projectId === projectId);
  let deadlineId = 0;

  if (deadlines.length !== 0) {
    let maxId = 0;

    deadlines.forEach((deadline) => {
      if (deadline.id > deadlineId) {
        maxId = deadline.id;
      }
    });

    deadlineId = maxId + 1;
  }

  commit('ADD_DEADLINE', { projectId, deadlineId, deadlineDate });
};

/**
 * Delete given deadline and it's tasks
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents the deadline's id.
 */
const deleteDeadline = ({ dispatch, commit }, { projectId, deadlineId }) => {
  commit('DELETE_DEADLINE', { projectId, deadlineId });

  // delete deadline's tasks
  dispatch('tasks/deleteDeadlineTasks', { projectId, deadlineId }, { root: true });
};

/**
 * Set selected deadline's completed state, and whether is true complete deadline's tasks
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents deadline's id.
 * @param {completed} boolean represents completed state.
 */
const setCompletedDeadline = ({ dispatch, commit }, { projectId, deadlineId, completed }) => {
  commit('SET_DEADLINE_COMPLETED', { projectId, deadlineId, completed });

  // if completed is true, all deadline's tasks are marked as completed
  if (completed === true) {
    dispatch('tasks/setCompletedDeadlineTasks', { projectId, deadlineId }, { root: true });
  }
};

/**
 * Set project's deadlines as completed
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 */
const setCompletedProjectDeadlines = ({ dispatch, getters }, { projectId }) => {
  const projectDeadlines = getters.getDeadlines;

  projectDeadlines.forEach((deadline) => {
    if (deadline.projectId === projectId) {
      dispatch('setCompletedDeadline', { projectId, deadlineId: deadline.id, completed: true });
    }
  });
};

/**
 * Delete project's deadlines
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 */
const deleteProjectDeadlines = ({ dispatch, getters }, { projectId }) => {
  const projectDeadlines = getters.getDeadlines;

  projectDeadlines.forEach((deadline) => {
    if (deadline.projectId === projectId) {
      dispatch('deleteDeadline', { projectId, deadlineId: deadline.id });
    }
  });
};

export {
  addDeadline,
  deleteDeadline,
  setCompletedDeadline,
  setCompletedProjectDeadlines,
  deleteProjectDeadlines,
};
