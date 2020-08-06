import Vue from 'vue';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './registerServiceWorker';
import router from './router';
import store from './store';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all';

import '@/style/app-variables.scss';

import App from './App.vue';

Vue.config.productionTip = false;

// Firebase config
const firebaseConfig = {
  apiKey: 'AIzaSyDfs6Jc7ljM-Pngr2JyzeRqweSFsUQvMHA',
  authDomain: 'projecting-app-1585941059670.firebaseapp.com',
  databaseURL: 'https://projecting-app-1585941059670.firebaseio.com',
  projectId: 'projecting-app-1585941059670',
  storageBucket: 'projecting-app-1585941059670.appspot.com',
  messagingSenderId: '323633001688',
  appId: '1:323633001688:web:bce1f954150ee84c0c53ad',
  measurementId: 'G-M1P2RQPD3F',
};
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
