/**
 * Get lastProjectIndex
 *
 * @param {state} object the vuex state object.
 * @return {Number} number which represents the last project's index.
 */
const getMaxDeadlinesForProject = (state) => state.settings.project.maxDeadlines;


export {
  /* eslint-disable import/prefer-default-export */
  getMaxDeadlinesForProject,
};
