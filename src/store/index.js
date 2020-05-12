import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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
      const userId = firebase.auth().currentUser.uid;

      firebase
        .database()
        .ref(`user-${userId}`)
        .once('value')
        .then((data) => {
          store.replaceState(
            Object.assign(state, JSON.parse(data.val().store)),
          );
        });
    },
  },
});

store.subscribe((mutation, state) => {
  const userId = firebase.auth().currentUser.uid;

  if (userId !== ''
    && mutation.type !== 'INITIALIZE_STORE') {
    firebase.database().ref(`user-${userId}`).set({
      store: JSON.stringify(state),
    });
  }
});

export default store;
