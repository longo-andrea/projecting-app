import Vue from 'vue';
import Vuex from 'vuex';

import settingsModule from './modules/settings/index';
import projectsModule from './modules/projects/index';
import deadlinesModule from './modules/deadlines/index';
import tasksModule from './modules/tasks/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    settings: settingsModule,
    projects: projectsModule,
    deadlines: deadlinesModule,
    tasks: tasksModule,
  },
});

export default store;
