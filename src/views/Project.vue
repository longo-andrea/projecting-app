<template>
  <div>
    <app-project-header
      v-bind:projectName="projectName"
      v-bind:projectInfo="projectInfo" />
    <app-project-stats />
  </div>
</template>

<script>
import AppProjectHeader from '../components/AppProjectHeader.vue';
import AppProjectStats from '../components/AppProjectStats.vue';

export default {
  name: 'Project',
  components: {
    AppProjectHeader,
    AppProjectStats,
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
  },
};
</script>

<style lang="scss" scoped>
</style>
