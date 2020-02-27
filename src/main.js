import Vue from 'vue';

// Element-ui imports
import ElementUI from 'element-ui';
import './style/element-variables.scss';

import router from './router';
import store from './store/store';

import App from './App.vue';

// Element-ui config
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
