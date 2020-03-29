<template>
  <div>
    <app-project-header
      v-bind:projectId="currentProjectId"
      v-bind:projectName="projectName"
      v-bind:projectInfo="projectInfo"
      @project-completed="projectUpdated"
      class="section section-first" />
    <app-project-stats
      v-bind:totalTasks="projectTasksCount"
      v-bind:completedTasks="projectCompletedTasks"
      v-bind:totalDeadlines="projectDeadlinesCount"
      v-bind:completedDeadlines="projectCompletedDeadlines"
      class="section" />
    <app-deadline-roadmap
      v-bind:projectId="currentProjectId"
      v-bind:deadlines="projectDeadlines"
      v-bind:tasks="projectTasks"
      :key="deadlinesRoadmapKey"
      class="section section-last" />
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
      deadlinesRoadmapKey: 0,
    };
  },
  computed: {
    projectName() {
      return this.$store.getters['projects/getProjects']
        .find((project) => project.id === this.currentProjectId).name;
    },
    projectInfo() {
      return this.$store.getters['projects/getProjects']
        .find((project) => project.id === this.currentProjectId).infos;
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
  methods: {
    projectUpdated() {
      this.deadlinesRoadmapKey += 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
