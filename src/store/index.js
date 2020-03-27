import Vue from 'vue';
import Vuex from 'vuex';
import projectsModule from './modules/projects/index';
import deadlinesModule from './modules/deadlines/index';
import tasksModule from './modules/tasks/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    projects: projectsModule,
    deadlines: deadlinesModule,
    tasks: tasksModule,
  },
});

store.subscribe((mutation, state) => {
  if (mutation.type.startsWith('tasks')) {
    localStorage.setItem('task_store', JSON.stringify(state));
  }
  if (mutation.type.startsWith('mutations')) {
    localStorage.setItem('deadlines_store', JSON.stringify(state));
  }
  if (mutation.type.startsWith('projects')) {
    localStorage.setItem('projects_store', JSON.stringify(state));
  }
});

export default store;
