<template>
  <div>
    <app-project-header
      v-bind:projectName="projectName"
      v-bind:projectInfo="projectInfo" />
    <app-project-stats
      v-bind:totalTasks="projectTasksCount"
      v-bind:completedTasks="projectCompletedTasks"
      v-bind:totalDeadlines="projectDeadlinesCount"
      v-bind:completedDeadlines="projectCompletedDeadlines" />
    <app-deadline-roadmap
      v-bind:projectId="currentProjectId"
      v-bind:deadlines="projectDeadlines"
      v-bind:tasks="projectTasks" />
  </div>
</template>

<script>
import AppProjectHeader from '../components/AppProjectHeader.vue';
import AppProjectStats from '../components/AppProjectStats.vue';
import AppDeadlineRoadmap from '../components/AppDeadlineRoadmap.vue';

export default {
  name: 'Project',
  components: {
    AppProjectHeader,
    AppProjectStats,
    AppDeadlineRoadmap,
  },
  data() {
    return {
      currentProjectId: parseInt(this.$route.params.id, 10),
    };
  },
  computed: {
    projectName() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      return currentProject.name;
    },
    projectInfo() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      return currentProject.infos[0];
    },
    projectTasks() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      return currentProject.tasks;
    },
    projectTasksCount() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      const projectTasksCount = currentProject.tasks.length;
      return projectTasksCount;
    },
    projectCompletedTasks() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      const projectCompletedTasksCount = currentProject.tasks.filter((task) => task.completed).length;
      return projectCompletedTasksCount;
    },
    projectDeadlines() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      return currentProject.deadlines;
    },
    projectDeadlinesCount() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      const projectDeadlinesCount = currentProject.deadlines.length;
      return projectDeadlinesCount;
    },
    projectCompletedDeadlines() {
      const currentProject = this.$store.getters.getProjects.find((project) => project.id === this.currentProjectId);
      const projectCompletedDeadlinesCount = currentProject.deadlines.filter((deadline) => deadline.completed).length;
      return projectCompletedDeadlinesCount;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
