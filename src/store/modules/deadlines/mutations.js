/**
 * Add a new deadline with given parameters
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the deadline's project id
 * @param {deadlineId} number that represent the deadline's id
 * @param {deadlineDate} date that represets deadline's date
 */
const ADD_DEADLINE = (state, projectId, deadlineId, deadlineDate) => {
  if (projectId !== undefined
    && deadlineId !== undefined
    && deadlineDate !== undefined) {
    state.deadlines.push({
      projectId,
      id: deadlineId,
      date: deadlineDate,
      completed: false,
    });

    /* eslint-disable no-param-reassign */
    state.lastDeadlineIndex += 1;
  }
};

/**
 * Set deadline's completed state
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the deadline's project id
 * @param {deadlineId} number that represent the deadline's id
 * @param {completed} boolenad that represets deadline's completed state
 */
const SET_DEADLINE_COMPLETED = (state, projectId, deadlineId, completed) => {
  if (projectId !== undefined
    && deadlineId !== undefined
    && completed !== undefined) {
    const deadlineIndex = state.deadlines.findIndex((deadline) => deadline.id === deadlineId
      && deadline.projectId === projectId);

    if (deadlineIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.deadlines[deadlineIndex].completed = completed;
    }
  }
};

const INITIALIZE_STORE = function (state) {
  if (localStorage.getItem('deadlines_store')) {
    this.replaceState(
      Object.assign(state, JSON.parse(localStorage.getItem('deadlines_store'))),
    );
  }
};

export {
  ADD_DEADLINE,
  SET_DEADLINE_COMPLETED,
  INITIALIZE_STORE,
};
