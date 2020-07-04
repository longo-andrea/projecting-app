import Vue from 'vue';
import Vuex from 'vuex';

import settingsModule from './modules/settings/index';
import deadlinesModule from './modules/deadlines/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    settings: settingsModule,
    deadlines: deadlinesModule,
  },
});

export default store;
