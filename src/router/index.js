import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AddProject from '../views/AddProject.vue';
import Project from '../views/Project.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
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

export default router;
