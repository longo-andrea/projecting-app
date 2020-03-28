/**
 * Add a new project with given information
 *
 * @param {commit} object the vuex state object.
 * @param {projectName} String which represents project's name
 * @param {projectDescription} String which represents project's description
 * @param {deadlinesDate} Array which represents project's deadlines
 */
const addProject = ({ dispatch, commit, getters }, { projectName, projectDescription, deadlinesDate }) => {
  const projectId = getters.getProjectIndex;
  commit('ADD_PROJECT', { projectId, projectName, projectDescription });

  deadlinesDate.forEach((deadline) => {
    dispatch('deadlines/addDeadline', {
      projectId,
      deadlineDate: deadline.date,
    },
    { root: true });
  });
};

/**
 * Set selected project's completed state
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {completed} boolean represents completed state.
 */
const setCompletedProject = ({ commit }, projectId, completed) => {
  commit('SET_PROJECT_COMPLETED', projectId, completed);
};

export {
  addProject,
  setCompletedProject,
};
