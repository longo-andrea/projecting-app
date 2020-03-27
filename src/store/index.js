import Vue from 'vue';
import Vuex from 'vuex';
import projectsModule from './modules/projects/index';
import deadlinesModule from './modules/deadlines/index';
import tasksModule from './modules/tasks/index';
import settingsModule from './modules/settings/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    projects: projectsModule,
    deadlines: deadlinesModule,
    tasks: tasksModule,
    settings: settingsModule,
  },
});

store.subscribe((mutation, state) => {
  if (!mutation.type.includes('/INITIALIZE_STORE')) {
    if (mutation.type.startsWith('tasks')) {
      localStorage.setItem('tasks_store', JSON.stringify(state.tasks));
    }
    if (mutation.type.startsWith('deadlines')) {
      localStorage.setItem('deadlines_store', JSON.stringify(state.deadlines));
    }
    if (mutation.type.startsWith('projects')) {
      localStorage.setItem('projects_store', JSON.stringify(state.projects));
    }
    if (mutation.type.startsWith('settings')) {
      localStorage.setItem('settings_store', JSON.stringify(state.settings));
    }
  }
});

export default store;
