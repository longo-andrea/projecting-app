<template>
  <div>
    <app-project-header
      v-bind:projectId="currentProjectId"
      v-bind:projectCompleted="project.completed"
      v-bind:projectName="project.name"
      v-bind:projectInfo="project.infos"
      class="section section-first" />
    <app-project-stats
      v-bind:totalTasks="projectTasksCount"
      v-bind:completedTasks="projectCompletedTasks"
      v-bind:totalDeadlines="projectDeadlinesCount"
      v-bind:completedDeadlines="projectCompletedDeadlines"
      class="section" />
    <app-project-roadmap
      v-bind:projectId="currentProjectId"
      v-bind:deadlines="projectDeadlines"
      v-bind:tasks="projectTasks"
      class="section section-last" />
  </div>
</template>

<script>
import AppProjectHeader from '../components/AppProjectHeader.vue';
import AppProjectRoadmap from '../components/AppProjectRoadmap.vue';
import AppProjectStats from '../components/AppProjectStats.vue';

export default {
  name: 'Project',
  components: {
    AppProjectHeader,
    AppProjectStats,
    AppProjectRoadmap,
  },
  data() {
    return {
      currentProjectId: parseInt(this.$route.params.id, 10),
    };
  },
  computed: {
    project() {
      return this.$store.getters['projects/getProjects']
        .find((project) => project.id === this.currentProjectId);
    },
    projectTasksCount() {
      return (this.$store.getters['tasks/getTasks']
        .filter((task) => task.projectId === this.currentProjectId)
        || []).length;
    },
    projectCompletedTasks() {
      return (this.$store.getters['tasks/getCompletedTasks']
        .filter((task) => task.projectId === this.currentProjectId)
        || []).length;
    },
    projectDeadlinesCount() {
      return (this.$store.getters['deadlines/getDeadlines']
        .filter((deadline) => deadline.projectId === this.currentProjectId)
        || []).length;
    },
    projectCompletedDeadlines() {
      return (this.$store.getters['deadlines/getCompletedDeadlines']
        .filter((deadline) => deadline.projectId === this.currentProjectId)
        || []).length;
    },
    projectDeadlines() {
      return this.$store.getters['deadlines/getDeadlines']
        .filter((deadline) => deadline.projectId === this.currentProjectId)
        || [];
    },
    projectTasks() {
      return this.$store.getters['tasks/getTasks']
        .filter((task) => task.projectId === this.currentProjectId)
        || [];
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
