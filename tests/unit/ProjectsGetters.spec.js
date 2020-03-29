import { expect } from 'chai';
import {
  getProjectIndex,
  getProjects,
  getCompletedProjects,
  getUnCompletedProjects,
} from '../../src/store/modules/projects/getters';

describe('getters', () => {
  it('get project index', () => {
    const state = {
      projects: [{}],
      lastProjectIndex: 1,
    };
    const result = getProjectIndex(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal(1);
  });

  it('get empty array if there are no projects', () => {
    const state = {
      projects: [],
    };
    const result = getProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });

  it('get array with projects list', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Project 1',
        infos: [
          { description: 'Project info' },
        ],
        completed: false,
      },
      {
        id: 1,
        name: 'Project 2',
        infos: [
          { description: 'Project info' },
        ],
        completed: false,
      }],
    };
    const result = getProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      id: 0,
      name: 'Project 1',
      infos: [
        { description: 'Project info' },
      ],
      completed: false,
    },
    {
      id: 1,
      name: 'Project 2',
      infos: [
        { description: 'Project info' },
      ],
      completed: false,
    }]);
  });

  it('get array with completed projects', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Project 1',
        infos: [{
          description: 'Project info',
        }],
        completed: true,
      }],
    };
    const result = getCompletedProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      id: 0,
      name: 'Project 1',
      infos: [{
        description: 'Project info',
      }],
      completed: true,
    }]);
  });

  it('get empty array if there are not completed projects', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Project 1',
        infos: [{
          description: 'Project info',
        }],
        completed: false,
      }],
    };
    const result = getCompletedProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });

  it('get array with uncompleted projects', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Project 1',
        infos: [
          { description: 'Project info' },
        ],
        completed: false,
      }],
    };
    const result = getUnCompletedProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      id: 0,
      name: 'Project 1',
      infos: [
        { description: 'Project info' },
      ],
      completed: false,
    }]);
  });

  it('get empty array if all projects are completed', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Project 1',
        infos: [
          { description: 'Project info' },
        ],
        completed: true,
      }],
    };
    const result = getUnCompletedProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
});
