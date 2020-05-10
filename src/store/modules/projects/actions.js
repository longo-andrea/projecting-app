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
 * Edit selected project's information
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {projectName} String contains project's name
 * @param {projectDescription} String contains project's description
 */
const editProject = ({ commit }, {
  projectId,
  projectName,
  projectDescription,
}) => {
  commit('SET_PROJECT_NAME', { projectId, projectName });
  commit('SET_PROJECT_DESCRIPTION', { projectId, projectDescription });
};

/**
 * Set selected deadline's completed state, and whether is true complete project's deadlines
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {completed} boolean represents completed state.
 */
const setCompletedProject = ({ dispatch, commit }, { projectId, completed }) => {
  commit('SET_PROJECT_COMPLETED', { projectId, completed });

  // if completed is true, all project's deadlines are marked as completed
  if (completed === true) {
    dispatch('deadlines/setCompletedProjectDeadlines', { projectId }, { root: true });
  }
};

/**
 * Delete given project and it's deadlines
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number which represents project's id
 */
const deleteProject = ({ dispatch, commit }, { projectId }) => {
  commit('DELETE_PROJECT', { projectId });

  // delete project's deadlines
  dispatch('deadlines/deleteProjectDeadlines', { projectId }, { root: true });
};

export {
  addProject,
  editProject,
  setCompletedProject,
  deleteProject,
};
