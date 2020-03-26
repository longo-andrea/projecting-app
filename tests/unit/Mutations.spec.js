import { expect } from 'chai';
import { mutations } from '../../src/store/index';

describe('mutations', () => {
  it('is project completed', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
        },
      ],
    };
    expect(state.projects[0].completed).to.be.false;
    mutations.completeProject(state, { projectId: 0 });
    expect(state.projects[0].completed).to.be.true;
  });
  it('is project uncompleted', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: true,
        },
      ],
    };
    expect(state.projects[0].completed).to.be.true;
    mutations.uncompleteProject(state, { projectId: 0 });
    expect(state.projects[0].completed).to.be.false;
  });
  it('is all project\'s deadlines completed ', () => {
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
            {
              id: 1,
              date: '2020-03-05',
              completed: false,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].deadlines[0].completed).to.be.false;
    expect(state.projects[0].deadlines[1].completed).to.be.false;
    mutations.completeProjectDeadlines(state, { projectId: 0 });
    expect(state.projects[0].deadlines[0].completed).to.be.true;
    expect(state.projects[0].deadlines[1].completed).to.be.true;
  });
  it('is all project\'s tasks completed ', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          tasks: [
            {
              id: 1,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
            {
              id: 2,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks[0].completed).to.be.false;
    expect(state.projects[0].tasks[0].workingOn).to.be.true;
    expect(state.projects[0].tasks[1].completed).to.be.false;
    expect(state.projects[0].tasks[1].workingOn).to.be.true;
    mutations.completeProjectTasks(state, { projectId: 0 });
    expect(state.projects[0].tasks[0].completed).to.be.true;
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
    expect(state.projects[0].tasks[1].completed).to.be.true;
    expect(state.projects[0].tasks[1].workingOn).to.be.false;
  });
  it('is deadline completed', () => {
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
        },
      ],
    };
    expect(state.projects[0].deadlines[0].completed).to.be.false;
    mutations.completeDeadline(state, { projectId: 0, deadlineId: 0 });
    expect(state.projects[0].deadlines[0].completed).to.be.true;
  });
  it('is deadline completed', () => {
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
        },
      ],
    };
    expect(state.projects[0].deadlines[0].completed).to.be.false;
    mutations.completeDeadline(state, { projectId: 0, deadlineId: 0 });
    expect(state.projects[0].deadlines[0].completed).to.be.true;
  });
  it('is deadline completed unset', () => {
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
              completed: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].deadlines[0].completed).to.be.true;
    mutations.uncompleteDeadline(state, { projectId: 0, deadlineId: 0 });
    expect(state.projects[0].deadlines[0].completed).to.be.false;
  });
  it('is deadline\'s task unworking on when deadline is completed', () => {
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
            },
            {
              id: 1,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks[0].workingOn).to.be.true;
    expect(state.projects[0].tasks[1].workingOn).to.be.true;
    mutations.unworkingOnDeadlineTasks(state, { projectId: 0, deadlineId: 0 });
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
    expect(state.projects[0].tasks[1].workingOn).to.be.false;
  });
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
            },
            {
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
    expect(state.projects[0].tasks[0].completed).to.be.false;
    mutations.completeTask(state, { projectId: 0, taskId: 0 });
    expect(state.projects[0].tasks[0].completed).to.be.true;
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
  });
  it('is task completed unset', () => {
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
              completed: true,
              workingOn: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks[0].completed).to.be.true;
    mutations.uncompleteTask(state, { projectId: 0, taskId: 0 });
    expect(state.projects[0].tasks[0].completed).to.be.false;
  });
  it('is task working on', () => {
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
              workingOn: false,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
    mutations.workingOnTask(state, { projectId: 0, taskId: 0 });
    expect(state.projects[0].tasks[0].workingOn).to.be.true;
  });
  it('is task working on unset', () => {
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
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks[0].workingOn).to.be.true;
    mutations.unworkingOnTask(state, { projectId: 0, taskId: 0 });
    expect(state.projects[0].tasks[0].workingOn).to.be.false;
  });
  it('no project was added after submittion of empty parameters', () => {
    const state = {
      projects: [],
    };
    mutations.addProject(state, {});
    expect(state.projects).to.be.empty;
  });
  it('project was added', () => {
    const state = {
      projects: [],
    };
    mutations.addProject(state, {
      projectName: 'Project Name',
      projectInfos: 'Project info',
      projectDeadlines: [
        {
          key: 0,
          date: 'Wed Mar 17 2020 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)',
          previousDate: 'Thu Mar 18 2020 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)',
          error: '',
        },
      ],
    });
    expect(state.projects).to.deep.equal(
      [
        {
          id: 0,
          name: 'Project Name',
          infos: ['Project info'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: 'Wed Mar 17 2020 00:00:00 GMT+0100 (Ora standard dell’Europa centrale)',
              completed: false,
            },
          ],
          tasks: [],
        },
      ],
    );
  });
  it('project was deleted', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [],
          tasks: [],
        },
      ],
    };
    mutations.deleteProject(state, {
      projectId: 0,
    });
    expect(state.projects).to.deep.equal([]);
  });
  it('project was edited', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [],
          tasks: [],
        },
      ],
    };
    mutations.editProject(state, {
      projectId: 0,
      projectName: 'Edited Project Name',
      projectDescription: 'Edited Project Description',
    });
    expect(state.projects).to.deep.equal([{
      id: 0,
      name: 'Edited Project Name',
      infos: ['Edited Project Description'],
      completed: false,
      deadlines: [],
      tasks: [],
    }]);
  });
  it('no task was added after submittion of empty parameters', () => {
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
          tasks: [],
        },
      ],
    };
    mutations.addTask(state, {
    });
    expect(state.projects[0].tasks).to.be.empty;
  });
  it('task was added', () => {
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
          tasks: [],
        },
      ],
    };
    mutations.addTask(state, {
      taskName: 'Task Name',
      taskDescription: 'Task description',
      projectId: 0,
      deadlineId: 0,
    });
    expect(state.projects[0].tasks).to.deep.equal([
      {
        id: 0,
        name: 'Task Name',
        description: 'Task description',
        deadlineIndex: 0,
        completed: false,
        workingOn: false,
      },
    ]);
  });
  it('task was deleted', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          tasks: [
            {
              id: 0,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks).to.deep.equal([
      {
        id: 0,
        name: 'Task 1',
        description: 'I have to finish this tasks!',
        deadlineIndex: 0,
        completed: false,
        workingOn: true,
      },
    ]);
    mutations.deleteTask(state, {
      projectId: 0,
      taskId: 0,
    });
    expect(state.projects[0].tasks).to.deep.equal([]);
  });
  it('task\'s name and description were updated', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test',
          infos: ['project infos will be here'],
          completed: false,
          tasks: [
            {
              id: 0,
              name: 'Task 1',
              description: 'I have to finish this tasks!',
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    expect(state.projects[0].tasks).to.deep.equal([
      {
        id: 0,
        name: 'Task 1',
        description: 'I have to finish this tasks!',
        deadlineIndex: 0,
        completed: false,
        workingOn: true,
      },
    ]);
    mutations.editTask(state, {
      projectId: 0,
      taskId: 0,
      taskName: 'Task Edited',
      taskDescription: 'Description Edited',
    });
    expect(state.projects[0].tasks).to.deep.equal([
      {
        id: 0,
        name: 'Task Edited',
        description: 'Description Edited',
        deadlineIndex: 0,
        completed: false,
        workingOn: true,
      },
    ]);
  });
  it('max deadline is not update if new value is lower then 0', () => {
    const state = {
      settings: {
        project: {
          maxDeadlines: 3,
        },
      },
    };
    expect(state.settings.project.maxDeadlines).to.equal(3);
    mutations.updateMaxDeadlinesSetting(state, { maxDeadlinesCount: 0 });
    expect(state.settings.project.maxDeadlines).to.equal(3);
  });
  it('max deadline is not update if new value is greater then the limit', () => {
    const state = {
      settings: {
        project: {
          maxDeadlines: 3,
        },
      },
    };
    expect(state.settings.project.maxDeadlines).to.equal(3);
    mutations.updateMaxDeadlinesSetting(state, { maxDeadlinesCount: 7 });
    expect(state.settings.project.maxDeadlines).to.equal(3);
  });
  it('max deadline is updated if new value is into the edges', () => {
    const state = {
      settings: {
        project: {
          maxDeadlines: 3,
        },
      },
    };
    expect(state.settings.project.maxDeadlines).to.equal(3);
    mutations.updateMaxDeadlinesSetting(state, { maxDeadlinesCount: 2 });
    expect(state.settings.project.maxDeadlines).to.equal(2);
  });
});
