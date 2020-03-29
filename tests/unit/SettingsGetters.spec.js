import { expect } from 'chai';
import { getMaxDeadlinesForProject } from '../../src/store/modules/settings/getters';

describe('getters', () => {
  it('get max deadlines for project', () => {
    const state = {
      settings: {
        project: {
          maxDeadlines: 6,
        },
      },
    };
    const result = getMaxDeadlinesForProject(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal(6);
  });
});
