/* eslint-disable */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import Project from '@/views/project/index';
import ProjectHeader from '@/views/project/ProjectHeader.vue';
import Tasks from '@/views/project/Tasks.vue';
import ProjectDeadlines from '@/views/project/ProjectDeadlines.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);

const actions = {
  'projects/addProject': jest.fn(),
  'settings/generateUniqeId': jest.fn(),
  'deadlines/addDeadline': jest.fn(),
  'tasks/deleteTask': jest.fn(),
  'tasks/addTask': jest.fn(),
  'tasks/setTaskCompleted': jest.fn(),
  'tasks/setTaskWorkingOn': jest.fn(),
  'tasks/setTaskName': jest.fn(),
  'tasks/setTaskDescription': jest.fn(),
  'tasks/completeAllProjectTasks': jest.fn(),
  'deadlines/completeAllProjectDeadlines': jest.fn(),
  'projects/setCompletionState': jest.fn(),
  'projects/setProjectName': jest.fn(),
  'projects/setProjectDescription': jest.fn(),
  'deadlines/deleteProjectDeadlines': jest.fn(),
  'tasks/deleteProjectTasks': jest.fn(),
  'projects/deleteProject': jest.fn(),
};

const getters = {
  'projects/getProject': () => () => {
    return ({
      completed: false,
      description: 'One more project to working on',
      id: 'pj-10141174919222720000',
      name: 'Another project',
    });
  },
  'deadlines/getProjectDeadlines': () => () => {
    return ([{
      completed: false,
      date: '2020-07-09T00:00:00.000Z',
      id: 'pj-591311787046110000',
      projectId: 'pj-10141174919222720000',
    }]);
  },
  'tasks/getProjectTasks': () => () => {
    return ([{
      completed: false,
      deadlineId: 'pj-591311787046110000',
      description: 'Descrizione',
      id: 'pj-6457572966356903000',
      name: 'Primo task aggiunto',
      projectId: 'pj-10141174919222720000',
      workingOn: true,
    }]);
  },
};

const router = new VueRouter();
const store = new Vuex.Store({
  actions,
  getters,
});

describe('Project page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Project component', () => {
    const wrapper = shallowMount(Project, {
      localVue,
      store,
      router,
    });

    it('should toggle project complete state', async () => {
      wrapper.vm.isReady = true;

      wrapper.findComponent({ name: 'ProjectHeader' }).vm.$emit('toggle-project-complete-state');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/completeAllProjectTasks']).toHaveBeenCalled();
      expect(actions['deadlines/completeAllProjectDeadlines']).toHaveBeenCalled();
      expect(actions['projects/setCompletionState']).toHaveBeenCalled();
    });

    it('should update project tasks', async () => {
      wrapper.vm.isReady = true;
      wrapper.vm.projectTasks = [];
      
      expect(wrapper.vm.projectTasks.length).toBe(0);

      wrapper.vm.updateProjectTasks();

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.projectTasks.length).toBe(1);
    });

    it('should toggle settings panel', async () => {
      wrapper.vm.isReady = true;
      
      wrapper.findComponent({ name: 'ProjectHeader' }).vm.$emit('toggle-settings');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.isSettingsOpen).toBe(true);
    });

    it('should toggle edit project panel', async () => {
      wrapper.vm.isReady = true;

      wrapper.findComponent({ name: 'ProjectHeader' }).vm.$emit('toggle-edit-project');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.editProject.isOpen).toBe(true);
    });

    it('should open add task panel and set deadline id', async () => {
      wrapper.vm.isReady = true;

      wrapper.findComponent({ name: 'ProjectDeadlines' }).vm.$emit('add-task-to-deadline');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.tasks.addTaskIsOpen).toBe(true);
      expect(wrapper.vm.tasks.addTaskToDeadline).not.toBe(null);
    });

    it('should close add task panel and unset deadline id', async () => {
      wrapper.vm.isReady = true;
      wrapper.vm.tasks.addTaskIsOpen = true;

      wrapper.findComponent({ name: 'ProjectDeadlines' }).vm.$emit('add-task-to-deadline');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.tasks.addTaskIsOpen).toBe(false);
      expect(wrapper.vm.tasks.addTaskToDeadline).toBe(null);
    });

    it('should add task', async () => {
      wrapper.vm.isReady = true;

      wrapper.vm.addTask();

      await wrapper.vm.$nextTick();

      expect(actions['settings/generateUniqeId']).toHaveBeenCalled();
      expect(actions['tasks/addTask']).toHaveBeenCalled();
    });

    it('should return representational string of given date', async () => {
      expect(wrapper.vm.dateToString(new Date('Mon Aug 03 2020 20:51:24 GMT+0200 (Central European Summer Time)'))).toBe('August 3, 2020');
    });

    it('should edit project info', async () => {
      wrapper.vm.isReady = true;
      wrapper.vm.projectName = 'Project';
      wrapper.vm.projectDescription = 'Project description';

      wrapper.vm.editProjectInfo();

      await wrapper.vm.$nextTick();

      expect(actions['projects/setProjectName']).toHaveBeenCalled();
      expect(actions['projects/setProjectDescription']).toHaveBeenCalled();
    });

    it('should not edit project info', async () => {
      wrapper.vm.isReady = true;
      wrapper.vm.projectName = '';
      wrapper.vm.projectDescription = '';

      wrapper.vm.editProjectInfo();

      await wrapper.vm.$nextTick();

      expect(actions['projects/setProjectName']).not.toHaveBeenCalled();
      expect(actions['projects/setProjectDescription']).not.toHaveBeenCalled();
    });

    it('should delete project', async () => {
      wrapper.vm.isReady = true;

      wrapper.vm.deleteProject();

      await wrapper.vm.$nextTick();

      expect(actions['deadlines/deleteProjectDeadlines']).toHaveBeenCalled();
      expect(actions['tasks/deleteProjectTasks']).toHaveBeenCalled();
      expect(actions['projects/deleteProject']).toHaveBeenCalled();
      expect(wrapper.vm.$route.path).toBe('/');
    });
  });

  describe('ProjectHeader component', () => {
    const wrapper = shallowMount(ProjectHeader, {
      localVue,
      store,
      router,
      propsData: {
        project: {
          completed: true,
          date: '2020-07-09T00:00:00.000Z',
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        },
        isSettingsOpen: false,
      },
    });

    it('should emit event to open settings', async () => {
      wrapper.findAll('.project-page__header__settings > span').trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['toggle-settings']).toBeTruthy();
    });

    it('should emit event to toggle project complete state', async () => {
      wrapper.findAll('.project-page__header__settings__list > span').at(0).trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['toggle-project-complete-state']).toBeTruthy();
    });

    it('should emit event to open edit panel', async () => {
      wrapper.findAll('.project-page__header__settings__list > span').at(1).trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['toggle-edit-project']).toBeTruthy();
    });

    it('should emit event to delete project', async () => {
      wrapper.findAll('.project-page__header__settings__list > span').at(2).trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['delete-project']).toBeTruthy();
    });
  });

  describe('Tasks component', () => {
    const wrapper = mount(Tasks, {
      localVue,
      store,
      router,
      propsData: {
        tasks: [{
          completed: false,
          deadlineId: 'pj-591311787046110000',
          description: 'Descrizione',
          id: 'pj-6457572966356903000',
          name: 'Primo task aggiunto',
          projectId: 'pj-10141174919222720000',
          workingOn: true,
        }],
      },
    });

    it('should open edit task panel', async () => {
      expect(wrapper.vm.editTask.isOpen).toBe(false);

      wrapper.findAll('.project-page__content__task-card__header__buttons__button').at(0).trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.editTask.isOpen).toBe(true);
    });

    it('should close edit task panel and clear information', async () => {
      wrapper.vm.editTask.isOpen = true;

      wrapper.findAll('.project-page__content__task-card__header__buttons__button').at(0).trigger('click');

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.editTask.isOpen).toBe(false);
      expect(wrapper.vm.editTask.taskId).toBe(null);
      expect(wrapper.vm.editTask.taskName).toBe(null);
      expect(wrapper.vm.editTask.taskDescription).toBe(null);
    });

    it('should set task as completed', async () => {
      wrapper.setProps({ isEditable: true });
      wrapper.findAll('.project-page__content__task-card__content__buttons__button > input').at(0).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/setTaskCompleted']).toHaveBeenCalled();
    });

    it('should not set task as completed if is not editable', async () => {
      wrapper.setProps({ isEditable: false });

      await wrapper.vm.$nextTick();

      wrapper.findAll('.project-page__content__task-card__content__buttons__button > input').at(0).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/setTaskCompleted']).not.toHaveBeenCalled();
    });

    it('should delete task', async () => {
      wrapper.setProps({ isEditable: true });

      await wrapper.vm.$nextTick();

      wrapper.findAll('.project-page__content__task-card__content__buttons__button > input').at(1).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/setTaskWorkingOn']).toHaveBeenCalled();
    });

    it('should delete task', async () => {
      wrapper.findAll('.project-page__content__task-card__header__buttons > span').at(1).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/deleteTask']).toHaveBeenCalled();
    });

    it('should not delete task if is not editable', async () => {
      wrapper.setProps({ isEditable: false });

      await wrapper.vm.$nextTick();

      wrapper.findAll('.project-page__content__task-card__header__buttons > span').at(1).trigger('click');

      expect(actions['tasks/deleteTask']).not.toHaveBeenCalled();
    });

    it('should edit task', async () => {
      wrapper.setProps({ isEditable: true });

      wrapper.vm.editTask.taskName = 'Task name';
      wrapper.vm.editTask.taskDescription = 'Task description';
      wrapper.findAll('.project-page__edit-task-panel__form__submit > .button').at(1).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/setTaskName']).toHaveBeenCalled();
      expect(actions['tasks/setTaskDescription']).toHaveBeenCalled();
    });

    it('should not edit task if name or description are empty', async () => {
      wrapper.setProps({ isEditable: false });

      wrapper.vm.editTask.taskName = '';
      wrapper.vm.editTask.taskDescription = '';
      wrapper.findAll('.project-page__edit-task-panel__form__submit > .button').at(1).trigger('click');

      await wrapper.vm.$nextTick();

      expect(actions['tasks/setTaskName']).not.toHaveBeenCalled();
      expect(actions['tasks/setTaskDescription']).not.toHaveBeenCalled();
    });
  });

  describe('ProjectDeadlines component', () => {
    const wrapper = mount(ProjectDeadlines, {
      localVue,
      store,
      router,
      propsData: {
        deadlines: [{
          completed: false,
          date: '2020-07-09T00:00:00.000Z',
          id: 'pj-591311787046110000',
          projectId: 'pj-10141174919222720000',
        }],
        tasks: [{
          completed: false,
          deadlineId: 'pj-591311787046110000',
          description: 'Descrizione',
          id: 'pj-6457572966356903000',
          name: 'Primo task aggiunto',
          projectId: 'pj-10141174919222720000',
          workingOn: true,
        }],
        isProjectComplted: false,
      },
    });

    it('should toggle active deadline', () => {
      wrapper.findAllComponents({ name: 'PCollapseItem' }).at(0).vm.$emit('tabOpened');

      expect(wrapper.vm.activeDeadline).toBe('2020-07-09T00:00:00.000Z');
    });

    it('should not emit add task to deadline if project is completed', async () => {
      wrapper.setProps({ isProjectCompleted: true });

      await wrapper.vm.$nextTick();

      wrapper.find('.project-page__content__input-add-task > .button').vm.$emit('buttonClicked');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['add-task-to-deadline']).toBeFalsy();
    });

    it('should emit add task to deadline', async () => {
      wrapper.setProps({ isProjectCompleted: false });

      await wrapper.vm.$nextTick();

      wrapper.find('.project-page__content__input-add-task > .button').vm.$emit('buttonClicked');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['add-task-to-deadline']).toBeTruthy();
    });

    it('should emit edit task', async () => {
      wrapper.setProps({ isProjectCompleted: false });

      await wrapper.vm.$nextTick();

      wrapper.findComponent({ name: 'DeadlineTasks' }).vm.$emit('edit-task');

      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['edit-task']).toBeTruthy();
    });

    it('should emit delete task', async () => {
      wrapper.setProps({ isProjectCompleted: false });

      await wrapper.vm.$nextTick();

      wrapper.findComponent({ name: 'DeadlineTasks' }).vm.$emit('delete-task');

      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted()['delete-task']).toBeTruthy();
    });
  });
});
