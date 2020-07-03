import Vue from 'vue';
import Vuex from 'vuex';

import settingsModule from './modules/settings/index';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    settings: settingsModule,
  },
});

export default store;
