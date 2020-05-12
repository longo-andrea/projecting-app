/**
 * Add a new taks with given information
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents the deadline's id.
 * @param {taskName} String which represents task's name
 * @param {taskDescription} String which represents task's description
 */
const addTask = ({ commit, getters }, {
  projectId, deadlineId, taskName, taskDescription,
}) => {
  const tasks = getters.getTasks
    .filter((task) => task.projectId === projectId);
  let taskId = 0;

  if (tasks.length !== 0) {
    let maxId = 0;

    tasks.forEach((task) => {
      if (task.id > taskId) {
        maxId = task.id;
      }
    });

    taskId = maxId + 1;
  }

  commit('ADD_TASK', {
    projectId, deadlineId, taskId, taskName, taskDescription,
  });
};

/**
 * Edit selected task's information
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {taskId} number represents task's id.
 * @param {taskName} String contains task's name
 * @param {taskDescription} String contains task's description
 */
const editTask = ({ commit }, {
  projectId,
  taskId,
  taskName,
  taskDescription,
}) => {
  commit('SET_TASK_NAME', { projectId, taskId, taskName });
  commit('SET_TASK_DESCRIPTION', { projectId, taskId, taskDescription });
};

/**
 * Delete specified task
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {taskId} number represents the task's id.
 */
const deleteTask = ({ commit }, { projectId, taskId }) => {
  commit('DELETE_TASK', { projectId, taskId });
};

/**
 * Set selected task's working on state
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {taskId} number represents task's id.
 * @param {workingOn} boolean represents working on state.
 */
const setWorkingOnTask = ({ commit }, { projectId, taskId, workingOn }) => {
  commit('SET_TASK_WORKING_ON', { projectId, taskId, workingOn });
};

/**
 * Set selected task's completed state
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {taskId} number represents task's id.
 * @param {completed} boolean represents completed state.
 */
const setCompletedTask = ({ commit }, { projectId, taskId, completed }) => {
  commit('SET_TASK_COMPLETED', { projectId, taskId, completed });
  commit('SET_TASK_WORKING_ON', { projectId, taskId, workingOn: false });
};

/**
 * Set deadline's tasks as completed and not workingOn
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents the deadline's id.
 */
const setCompletedDeadlineTasks = ({ dispatch, getters }, { projectId, deadlineId }) => {
  const deadlineTasks = getters.getTasks;

  deadlineTasks.forEach((task) => {
    if (task.projectId === projectId && task.deadlineId === deadlineId) {
      dispatch('setCompletedTask', { projectId, taskId: task.id, completed: true });
    }
  });
};

/**
 * Delete deadline's tasks
 *
 * @param {commit} object the vuex state object.
 * @param {projectId} number represents the project's id.
 * @param {deadlineId} number represents the deadline's id.
 */
const deleteDeadlineTasks = ({ dispatch, getters }, { projectId, deadlineId }) => {
  const deadlineTasks = getters.getTasks;

  deadlineTasks.forEach((task) => {
    if (task.projectId === projectId && task.deadlineId === deadlineId) {
      dispatch('deleteTask', { projectId, taskId: task.id });
    }
  });
};


export {
  addTask,
  editTask,
  deleteTask,
  setWorkingOnTask,
  setCompletedTask,
  setCompletedDeadlineTasks,
  deleteDeadlineTasks,
};
