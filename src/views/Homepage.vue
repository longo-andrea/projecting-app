<template>
  <div>
    <p-navbar />
    <h1>Hompage</h1>

    <ul>
      <h1>Projects</h1>
      <li v-for="project in projects" :key="project.id">
        <router-link :to="`project/${project.id}`">{{ project.name }}</router-link>
      </li>
    </ul>

    <ul>
      <h1>Deadlines</h1>
      <li v-for="deadline in deadlines" :key="deadline.id">
        {{ deadline.date }}
      </li>
    </ul>

    <ul>
      <h1>Tasks</h1>
      <li v-for="task in tasks" :key="task.id">
        {{ task.name }}
      </li>
    </ul>

    <router-link to="/addproject">Add a project</router-link>
  </div>
</template>

<script>
import PNavbar from '@/components/PNavbar.vue';

export default {
  name: 'Homepage',
  components: {
    PNavbar,
  },
  data() {
    return {
      projects: null,
      deadlines: null,
      tasks: null,
    };
  },
  mounted() {
    this.projects = this.$store.getters['projects/getProjects'];
    this.deadlines = this.$store.getters['deadlines/getDeadlines'];
    this.tasks = this.$store.getters['tasks/getTasks'];
  },
};
</script>

<style lang="scss">
</style>
