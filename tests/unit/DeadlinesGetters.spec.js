import { expect } from 'chai';
import {
  getDeadlines,
  getCompletedDeadlines,
  getUncompletedDeadlines,
} from '../../src/store/modules/deadlines/getters';

describe('getters', () => {
  it('get deadlines', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 0,
        date: '2020-03-30T22:00:00.000Z',
        completed: false,
      }],
    };
    const result = getDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      id: 0,
      date: '2020-03-30T22:00:00.000Z',
      completed: false,
    }]);
  });

  it('get only completed deadlines', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 0,
        date: '2020-03-30T22:00:00.000Z',
        completed: true,
      },
      {
        projectId: 0,
        id: 1,
        date: '2020-03-30T22:00:00.000Z',
        completed: false,
      }],
    };
    const result = getCompletedDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      id: 0,
      date: '2020-03-30T22:00:00.000Z',
      completed: true,
    }]);
  });

  it('get only uncompleted deadlines', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 0,
        date: '2020-03-30T22:00:00.000Z',
        completed: true,
      },
      {
        projectId: 0,
        id: 1,
        date: '2020-03-30T22:00:00.000Z',
        completed: false,
      }],
    };
    const result = getUncompletedDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      projectId: 0,
      id: 1,
      date: '2020-03-30T22:00:00.000Z',
      completed: false,
    }]);
  });
});
