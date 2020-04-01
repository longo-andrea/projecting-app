import { expect } from 'chai';
import {
  ADD_TASK,
  DELETE_TASK,
  SET_TASK_WORKING_ON,
  SET_TASK_COMPLETED,
  SET_TASK_NAME,
  SET_TASK_DESCRIPTION,
} from '../../src/store/modules/tasks/mutations';

describe('getters', () => {
  it('task was added', () => {
    const state = {
      tasks: [],
    };
    ADD_TASK(state, {
      projectId: 0,
      deadlineId: 0,
      taskId: 0,
      taskName: 'Task',
      taskDescription: 'Description',
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'Description',
      completed: false,
      workingOn: false,
    });
  });

  it('task was deleted', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: false,
        workingOn: false,
      }],
    };
    DELETE_TASK(state, {
      projectId: 0,
      taskId: 0,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks).to.deep.equal([]);
  });

  it('task was set as working on', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: false,
        workingOn: false,
      }],
    };
    SET_TASK_WORKING_ON(state, {
      projectId: 0,
      taskId: 0,
      workingOn: true,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'Description',
      completed: false,
      workingOn: true,
    });
  });

  it('task was unset as working on', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: false,
        workingOn: true,
      }],
    };
    SET_TASK_WORKING_ON(state, {
      projectId: 0,
      taskId: 0,
      workingOn: false,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'Description',
      completed: false,
      workingOn: false,
    });
  });

  it('task was set as completed', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: false,
        workingOn: true,
      }],
    };
    SET_TASK_COMPLETED(state, {
      projectId: 0,
      taskId: 0,
      completed: true,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'Description',
      completed: true,
      workingOn: true,
    });
  });

  it('task was unset as completed', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: true,
        workingOn: false,
      }],
    };
    SET_TASK_COMPLETED(state, {
      projectId: 0,
      taskId: 0,
      completed: false,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'Description',
      completed: false,
      workingOn: false,
    });
  });

  it('task name was edited', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: true,
        workingOn: false,
      }],
    };
    SET_TASK_NAME(state, {
      projectId: 0,
      taskId: 0,
      taskName: 'New Task Name',
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'New Task Name',
      description: 'Description',
      completed: true,
      workingOn: false,
    });
  });

  it('task description was edited', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Task',
        description: 'Description',
        completed: true,
        workingOn: false,
      }],
    };
    SET_TASK_DESCRIPTION(state, {
      projectId: 0,
      taskId: 0,
      taskDescription: 'New Task Description',
    });
    /* eslint-disable no-unused-expressions */
    expect(state.tasks[0]).to.deep.equal({
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Task',
      description: 'New Task Description',
      completed: true,
      workingOn: false,
    });
  });
});
