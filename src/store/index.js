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
  mutations: {
    INITIALIZE_STORE(state) {
      if (localStorage.getItem('store')) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem('store'))),
        );
      }
    },
  },
});

store.subscribe((mutation, state) => {
  localStorage.setItem('store', JSON.stringify(state));
});

export default store;
