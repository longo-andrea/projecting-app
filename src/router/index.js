import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AddProject from '../views/AddProject.vue';
import Project from '../views/Project.vue';
import Settings from '../views/Settings.vue';
import Login from '../views/Login.vue';

import store from '../store/index';

Vue.use(VueRouter);

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    component: About,
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings,
  },
  {
    path: '/add-project',
    name: 'Add Project',
    component: AddProject,
  },
  {
    path: '/project/:id',
    name: 'Project',
    component: Project,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.getters['settings/isUserLoggedIn']) {
      next();
    } else {
      next('/login');
    }
  } else {
    if (store.getters['settings/isUserLoggedIn']) {
      next('/');
    }

    next();
  }
});

export default router;
