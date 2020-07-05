<template>
  <div class="homepage">
    <p-navbar />

    <div class="homepage__content">
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

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
    </div>
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
.homepage {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 4rem auto;

  .homepage__content {
    overflow-y: scroll;
  }
}
</style>
