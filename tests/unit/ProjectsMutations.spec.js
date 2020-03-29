import { expect } from 'chai';
import {
  ADD_PROJECT,
  DELETE_PROJECT,
  SET_PROJECT_COMPLETED,
  SET_PROJECT_NAME,
  SET_PROJECT_DESCRIPTION,
} from '../../src/store/modules/projects/mutations';

describe('getters', () => {
  it('project was added', () => {
    const state = {
      projects: [],
      lastProjectIndex: 0,
    };
    ADD_PROJECT(state, { projectId: 0, projectName: 'Name', projectDescription: 'Description' });
    /* eslint-disable no-unused-expressions */
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
  });

  it('project was deleted', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Name',
        infos: [{
          description: 'Description',
        }],
        completed: false,
      }],
      lastProjectIndex: 1,
    };
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
    DELETE_PROJECT(state, { projectId: 0 });
    /* eslint-disable no-unused-expressions */
    expect(state.projects).to.deep.equal([]);
  });

  it('set project as completed', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Name',
        infos: [{
          description: 'Description',
        }],
        completed: false,
      }],
      lastProjectIndex: 1,
    };
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
    SET_PROJECT_COMPLETED(state, { projectId: 0, completed: true });
    /* eslint-disable no-unused-expressions */
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: true,
    });
  });

  it('set project as uncompleted', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Name',
        infos: [{
          description: 'Description',
        }],
        completed: true,
      }],
      lastProjectIndex: 1,
    };
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: true,
    });
    SET_PROJECT_COMPLETED(state, { projectId: 0, completed: false });
    /* eslint-disable no-unused-expressions */
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
  });

  it('project name was setted', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Name',
        infos: [{
          description: 'Description',
        }],
        completed: false,
      }],
      lastProjectIndex: 1,
    };
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
    SET_PROJECT_NAME(state, { projectId: 0, projectName: 'New name' });
    /* eslint-disable no-unused-expressions */
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'New name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
  });

  it('project description was setted', () => {
    const state = {
      projects: [{
        id: 0,
        name: 'Name',
        infos: [{
          description: 'Description',
        }],
        completed: false,
      }],
      lastProjectIndex: 1,
    };
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'Description',
      }],
      completed: false,
    });
    SET_PROJECT_DESCRIPTION(state, {
      projectId: 0,
      projectDescription: 'New description',
    });
    /* eslint-disable no-unused-expressions */
    expect(state.projects[0]).to.deep.equal({
      id: 0,
      name: 'Name',
      infos: [{
        description: 'New description',
      }],
      completed: false,
    });
  });
});
