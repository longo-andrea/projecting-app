import Vue from 'vue';
import Vuex from 'vuex';
import projectsModule from './modules/projects/index';
import deadlinesModule from './modules/deadlines/index';
import tasksModule from './modules/tasks/index';


Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    projects: projectsModule,
    deadlines: deadlinesModule,
    tasks: tasksModule,
  },
});
