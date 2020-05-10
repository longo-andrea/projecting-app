import Vue from 'vue';

// Element-ui imports
import locale from 'element-ui/lib/locale/lang/en';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import './style/element-variables.scss';

import * as firebase from 'firebase/app';
import 'firebase/auth';

import router from './router';
import store from './store/index';

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

Vue.use(ElementUI, { locale });

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('INITIALIZE_STORE');
  },
  render: (h) => h(App),
}).$mount('#app');
