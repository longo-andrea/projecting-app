import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';
import 'firebase/auth';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AddProject from '../views/AddProject.vue';
import Project from '../views/Project.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      if (firebase.auth().currentUser) {
        next('/');
      } else {
        next();
      }
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { auth: true },
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { auth: true },
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
    meta: { auth: true },
  },
  {
    path: '/add-project',
    name: 'Add Project',
    component: AddProject,
    meta: { auth: true },
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project,
    meta: { auth: true },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        next({
          path: '/login',
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
