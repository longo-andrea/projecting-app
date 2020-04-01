import { expect } from 'chai';
import {
  getTasks,
  getWorkingOnTasks,
  getCompletedTasks,
} from '../../src/store/modules/tasks/getters';

describe('getters', () => {
  it('get tasks list', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Nome task',
        description: 'This is a description',
        completed: true,
        workingOn: false,
      },
      {
        projectId: 0,
        deadlineId: 0,
        id: 1,
        name: 'Nome task',
        description: 'This is a description',
        completed: true,
        workingOn: false,
      }],
    };
    const result = getTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Nome task',
      description: 'This is a description',
      completed: true,
      workingOn: false,
    },
    {
      projectId: 0,
      deadlineId: 0,
      id: 1,
      name: 'Nome task',
      description: 'This is a description',
      completed: true,
      workingOn: false,
    }]);
  });

  it('get working on task', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Nome task',
        description: 'This is a description',
        completed: true,
        workingOn: false,
      },
      {
        projectId: 0,
        deadlineId: 0,
        id: 1,
        name: 'Nome task',
        description: 'This is a description',
        completed: false,
        workingOn: true,
      }],
    };
    const result = getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      deadlineId: 0,
      id: 1,
      name: 'Nome task',
      description: 'This is a description',
      completed: false,
      workingOn: true,
    }]);
  });

  it('get completed task', () => {
    const state = {
      tasks: [{
        projectId: 0,
        deadlineId: 0,
        id: 0,
        name: 'Nome task',
        description: 'This is a description',
        completed: true,
        workingOn: false,
      },
      {
        projectId: 0,
        deadlineId: 0,
        id: 1,
        name: 'Nome task',
        description: 'This is a description',
        completed: false,
        workingOn: true,
      }],
    };
    const result = getCompletedTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      deadlineId: 0,
      id: 0,
      name: 'Nome task',
      description: 'This is a description',
      completed: true,
      workingOn: false,
    }]);
  });
});
