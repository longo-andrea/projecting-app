import { expect } from 'chai';
import { getters } from '../../src/store/index';

describe('getters', () => {
  it('get empty array if there are no projects', () => {
    const state = {};
    const result = getters.getActiveProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get empty array if all projects are completed', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test 1',
          infos: ['Project infos here.'],
          completed: true,
        },
        {
          id: 1,
          name: 'Project Test 2',
          infos: ['Project infos here.'],
          completed: true,
        },
      ],
    };
    const result = getters.getActiveProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get array with unfinished projects', () => {
    const projectId = 0;
    const projectName = 'Project Test 1';
    const projectInfos = ['Project infos here.'];
    const state = {
      projects: [
        {
          id: projectId,
          name: projectName,
          infos: projectInfos,
          completed: false,
        },
      ],
    };
    const result = getters.getActiveProjects(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([{
      id: projectId,
      name: projectName,
      infos: projectInfos,
    }]);
  });
  it('get empty array if there are no projects with working on tasks', () => {
    const state = {};
    const result = getters.getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get empty array if there are no tasks in projects', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project 1',
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: '2020-03-16',
              completed: false,
            },
          ],
        },
      ],
    };
    const result = getters.getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get empty array if all the tasks are completed', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project 1',
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: '2020-03-16',
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
    const result = getters.getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get an array with working on tasks on a project', () => {
    const projectId = 0;
    const projectName = 'Project Test';
    const taskId = 0;
    const taskName = 'Test 1';
    const taskDescription = 'I have to finish this task!';
    const taskDeadline = '2020-03-05';
    const state = {
      projects: [
        {
          id: projectId,
          name: projectName,
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: taskDeadline,
              completed: false,
            },
          ],
          tasks: [
            {
              id: taskId,
              name: taskName,
              description: taskDescription,
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    const result = getters.getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([
      {
        projectId,
        projectName,
        taskId,
        taskName,
        taskDescription,
        taskDeadline,
      },
    ]);
  });
  it('get an array with working on tasks on different projects', () => {
    const projectId = 0;
    const projectName = 'Project Test';
    const taskId = 0;
    const taskName = 'Test 1';
    const taskDescription = 'I have to finish this task!';
    const taskDeadline = '2020-03-05';
    const projectId2 = 1;
    const projectName2 = 'Project Test 1';
    const taskId2 = 0;
    const taskName2 = 'Test 1';
    const taskDescription2 = 'I have to finish this task!';
    const taskDeadline2 = '2020-03-05';
    const state = {
      projects: [
        {
          id: projectId,
          name: projectName,
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: taskDeadline,
              completed: false,
            },
          ],
          tasks: [
            {
              id: taskId,
              name: taskName,
              description: taskDescription,
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
        {
          id: projectId2,
          name: projectName2,
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: taskDeadline2,
              completed: false,
            },
          ],
          tasks: [
            {
              id: taskId2,
              name: taskName2,
              description: taskDescription2,
              deadlineIndex: 0,
              completed: false,
              workingOn: true,
            },
          ],
        },
      ],
    };
    const result = getters.getWorkingOnTasks(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([
      {
        projectId,
        projectName,
        taskId,
        taskName,
        taskDescription,
        taskDeadline,
      },
      {
        projectId: projectId2,
        projectName: projectName2,
        taskId: taskId2,
        taskName: taskName2,
        taskDescription: taskDescription2,
        taskDeadline: taskDeadline2,
      },
    ]);
  });
  it('get empty array if there are no projects with deadlines', () => {
    const state = {};
    const result = getters.getIncomingDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get empty array if all deadlines are completed', () => {
    const state = {
      projects: [
        {
          id: 0,
          name: 'Project Test 1',
          infos: ['Project infos here.'],
          completed: false,
          deadlines: [
            {
              id: 0,
              date: '2020-03-16',
              completed: true,
            },
            {
              id: 1,
              date: '2020-03-15',
              completed: true,
            },
          ],
        },
      ],
    };
    const result = getters.getIncomingDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([]);
  });
  it('get an array with incoming deadlines from a project', () => {
    const projectId = 0;
    const projectName = 'Project Test';
    const deadlineId = 0;
    const deadlineDate = '2020-03-05';
    const state = {
      projects: [
        {
          id: projectId,
          name: projectName,
          infos: ['Project infos here.'],
          completed: false,
          deadlines: [
            {
              id: deadlineId,
              date: deadlineDate,
              completed: false,
            },
          ],
        },
      ],
    };
    const result = getters.getIncomingDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([
      {
        deadlineDate,
        deadlineId,
        projectId,
        projectName,
      },
    ]);
  });
  it('get an array with incoming deadlines on different projects', () => {
    const projectId = 0;
    const projectName = 'Project Test';
    const deadlineId = 0;
    const deadlineDate = '2020-03-05';
    const projectId2 = 1;
    const projectName2 = 'Project Test 2';
    const deadlineId2 = 0;
    const deadlineDate2 = '2020-03-06';
    const state = {
      projects: [
        {
          id: projectId,
          name: projectName,
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: deadlineId,
              date: deadlineDate,
              completed: false,
            },
          ],
        },
        {
          id: projectId2,
          name: projectName2,
          infos: ['project infos will be here'],
          completed: false,
          deadlines: [
            {
              id: deadlineId2,
              date: deadlineDate2,
              completed: false,
            },
          ],
        },
      ],
    };
    const result = getters.getIncomingDeadlines(state);
    /* eslint-disable no-unused-expressions */
    expect(result).to.deep.equal([
      {
        projectId,
        projectName,
        deadlineId,
        deadlineDate,
      },
      {
        projectId: projectId2,
        projectName: projectName2,
        deadlineId: deadlineId2,
        deadlineDate: deadlineDate2,
      },
    ]);
  });
});
