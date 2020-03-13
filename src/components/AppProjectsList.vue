<template>
  <div>
    <el-card
      v-for="project in activeProjects"
      v-bind:key="project.name"
      class="project-item">
      <app-project-info
        v-bind:id="project.id"
        v-bind:name="project.name"
        v-bind:infos="project.infos" />
    </el-card>
  </div>
</template>

<script>
import AppProjectInfo from './AppProjectInfo.vue';

export default {
  name: 'AppProjectsList',
  components: {
    AppProjectInfo,
  },
  computed: {
    activeProjects() {
      return this.$store.getters.getActiveProjects;
    },
  },
};
</script>

<style scoped lang="scss">
.project-item {
  margin-bottom: 1.2rem;
}
</style>
