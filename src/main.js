import Vue from 'vue';
import locale from 'element-ui/lib/locale/lang/en';

// Element-ui imports
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/display.css';
import './style/element-variables.scss';

import router from './router';
import store from './store/index';

import App from './App.vue';

// Element-ui config
Vue.use(ElementUI, { locale });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  beforeCreate() {
    this.$store.commit('INITIALIZE_STORE');
  },
  render: (h) => h(App),
}).$mount('#app');
