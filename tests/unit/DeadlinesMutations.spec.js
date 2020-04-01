import { expect } from 'chai';
import {
  ADD_DEADLINE,
  DELETE_DEADLINE,
  SET_DEADLINE_COMPLETED,
} from '../../src/store/modules/deadlines/mutations';

describe('getters', () => {
  it('dealine was added', () => {
    const state = {
      deadlines: [],
    };
    ADD_DEADLINE(state, {
      projectId: 0,
      deadlineId: 1,
      deadlineDate: '2020-03-30T22:00:00.000Z',
    });
    /* eslint-disable no-unused-expressions */
    expect(state.deadlines[0]).to.deep.equal({
      projectId: 0,
      id: 1,
      date: '2020-03-30T22:00:00.000Z',
      completed: false,
    });
  });

  it('dealine was deleted', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 1,
        date: '2020-03-30T22:00:00.000Z',
        completed: false,
      }],
    };
    DELETE_DEADLINE(state, {
      projectId: 0,
      deadlineId: 1,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.deadlines).to.deep.equal([]);
  });

  it('dealine was set completed', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 1,
        date: '2020-03-30T22:00:00.000Z',
        completed: false,
      }],
    };
    SET_DEADLINE_COMPLETED(state, {
      projectId: 0,
      deadlineId: 1,
      completed: true,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.deadlines).to.deep.equal([{
      projectId: 0,
      id: 1,
      date: '2020-03-30T22:00:00.000Z',
      completed: true,
    }]);
  });

  it('dealine was set uncompleted', () => {
    const state = {
      deadlines: [{
        projectId: 0,
        id: 1,
        date: '2020-03-30T22:00:00.000Z',
        completed: true,
      }],
    };
    SET_DEADLINE_COMPLETED(state, {
      projectId: 0,
      deadlineId: 1,
      completed: false,
    });
    /* eslint-disable no-unused-expressions */
    expect(state.deadlines).to.deep.equal([{
      projectId: 0,
      id: 1,
      date: '2020-03-30T22:00:00.000Z',
      completed: false,
    }]);
  });
});
