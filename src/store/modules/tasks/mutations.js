/**
 * Add a new task with given parameters
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {deadlineId} number that represent the task's deadline id
 * @param {taskId} number that represets task's id
 * @param {taskName} string that represents the task's name.
 * @param {taskDescription} string that represents the tasks's description.
 */
const ADD_TASK = (state, {
  projectId, deadlineId, taskId, taskName, taskDescription,
}) => {
  if (projectId !== undefined
      && deadlineId !== undefined
      && taskId !== undefined
      && taskName !== ''
      && taskDescription !== '') {
    state.tasks.push({
      projectId,
      deadlineId,
      id: taskId,
      name: taskName,
      description: taskDescription,
      completed: false,
      workingOn: false,
    });

    /* eslint-disable no-param-reassign */
    state.lastTaskIndex += 1;
  }
};

/**
 * Delete given task
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number that represents the task's project id
 * @param {taskId} number that represets task's id
 */
const DELETE_TASK = (state, { projectId, taskId }) => {
  if (projectId !== undefined
    && taskId !== undefined) {
    /* eslint-disable no-param-reassign */
    state.tasks = state.tasks
      .filter((task) => task.id !== taskId
        || (task.id === taskId && task.projectId !== projectId));
  }
};

/**
 * Set task as working on
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number which represents task's project id
 * @param {taskId} number which represents task's id
 * @param {workingOn} boolean which represents working on state
 */
const SET_TASK_WORKING_ON = (state, { projectId, taskId, workingOn }) => {
  if (taskId !== undefined
      && workingOn !== undefined) {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId && task.projectId === projectId);

    if (taskIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.tasks[taskIndex].workingOn = workingOn;
    }

    // if task is already completed, throw new error
    if (workingOn && state.tasks[taskIndex].completed) {
      throw new Error('You can\'t set this task as working on, is already completed!');
    }
  }
};

/**
 * Set task as completed
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number which represents task's project id
 * @param {taskId} number which represents task's id
 * @param {completed} boolean which represents completed state
 */
const SET_TASK_COMPLETED = (state, { projectId, taskId, completed }) => {
  if (taskId !== undefined
    && completed !== undefined) {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId && task.projectId === projectId);

    if (taskIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.tasks[taskIndex].completed = completed;
    }
  }
};

/**
 * Set task's name
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number which represents task's project id
 * @param {taskId} number which represents task's id
 * @param {taskName} String which represents new project's name
 */
const SET_TASK_NAME = (state, { projectId, taskId, taskName }) => {
  if (taskId !== undefined
    && taskName !== '') {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId && task.projectId === projectId);

    if (taskIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.tasks[taskIndex].name = taskName;
    }
  }
};

/**
 * Set task's description
 *
 * @param {state} object the vuex state object.
 * @param {projectId} number which represents task's project id
 * @param {taskId} number which represents task's id
 * @param {taskDescription} String which represents new project's description
 */
const SET_TASK_DESCRIPTION = (state, { projectId, taskId, taskDescription }) => {
  if (taskId !== undefined
    && taskDescription !== '') {
    const taskIndex = state.tasks.findIndex((task) => task.id === taskId && task.projectId === projectId);

    if (taskIndex > -1) {
      /* eslint-disable no-param-reassign */
      state.tasks[taskIndex].description = taskDescription;
    }
  }
};

export {
  ADD_TASK,
  DELETE_TASK,
  SET_TASK_WORKING_ON,
  SET_TASK_COMPLETED,
  SET_TASK_NAME,
  SET_TASK_DESCRIPTION,
};
