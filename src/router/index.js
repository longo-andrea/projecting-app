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
        component: () => import(/* webpackChunkName: "login" */ '../views/login/index.js'),
      },
      {
        path: '/homepage',
        name: 'homepage',
        redirect: { path: 'homepage/summary' },
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
        children: [
          {
            path: 'summary',
            name: 'summary',
            component: () => import(/* webpackChunkName: "summary" */ '../views/summary/index.js'),
          },
          {
            path: 'addproject',
            name: 'addproject',
            component: () => import(/* webpackChunkName: "addproject" */ '../views/add-project/index.js'),
          },
          {
            path: 'project/:projectId',
            name: 'project',
            component: () => import(/* webpackChunkName: "project" */ '../views/project/index.js'),
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
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
