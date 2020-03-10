import { expect } from 'chai';
import { mutations } from '../../src/store/index';

describe('mutations', () => {
  it('is task completed', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: '2020-03-05',
              completed: false,
            },
          ],
          tasks: [
            {
              id: 0,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            }, {
              id: 1,
              name: 'Task 2',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    mutations.completeTask(state, { projectId: 0, taskId: 0 });
    expect(state.projects[0].tasks[0].completed).to.be.true;
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
  });
});