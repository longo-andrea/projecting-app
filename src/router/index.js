import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: { path: '/login' },
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
      },
      {
        path: '/homepage',
        name: 'homepage',
        component: () => import(/* webpackChunkName: "homepage" */ '../views/Homepage.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters['settings/getUserSession'] !== null) {
            // if the user is logged in, then he can going on
            next();
          } else {
            // otherwise it will be redirected to login page
            next('/login');
          }
        },
      },
      {
        path: '/addproject',
        name: 'addproject',
        component: () => import(/* webpackChunkName: "addproject" */ '../views/AddProject.vue'),
        beforeEnter: (to, from, next) => {
          if (store.getters['settings/getUserSession'] !== null) {
            // if the user is logged in, then he can going on
            next();
          } else {
            // otherwise it will be redirected to login page
            next('/login');
          }
        },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
