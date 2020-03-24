<template>
  <div>
    <div class="projects-list">
      <el-card
        v-for="project in activeProjects"
        v-bind:key="project.name"
        class="project-item">
        <app-project-info
          v-bind:id="project.id"
          v-bind:name="project.name"
          v-bind:infos="project.infos"
          class="project-item" />
      </el-card>
    </div>
    <div class="projects-list">
      <el-card
        v-for="project in completedProjects"
        v-bind:key="project.name"
        class="project-item">
        <app-project-info
          v-bind:id="project.id"
          v-bind:name="project.name"
          v-bind:infos="project.infos"
          class="project-item" />
      </el-card>
    </div>
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
    completedProjects() {
      return this.$store.getters.getCompletedProjects;
    },
  },
};
</script>

<style scoped lang="scss">
.project-item {
  margin-bottom: 1.2rem;
}

@media screen and (min-width: $--md-screen) {
  .projects-list {
    display: flex;
    flex-wrap: wrap;

    .project-item {
      flex-basis: 48%;

      &:not(:nth-child(2n)) {
        margin-right: 4%;
      }
    }
  }
}

@media screen and (min-width: $--bg-screen) {
  .projects-list {
    display: flex;
    flex-wrap: wrap;

    .project-item {
      flex-basis: 30%;

      &:not(:nth-child(2n)) {
        margin-right: 0;
      }

      &:not(:nth-child(3n)) {
        margin-right: 5%;
      }
    }
  }
}
</style>
