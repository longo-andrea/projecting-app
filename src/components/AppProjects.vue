<template>
  <div>
    <div class="projects-list">
      <el-card
        v-for="project in uncompletedProjects"
        v-bind:key="project.name"
        class="project-item">
        <app-project-card
          v-bind:id="project.id"
          v-bind:name="project.name"
          v-bind:infos="project.infos"
          class="project-item" />
      </el-card>
    </div>
      <el-button
        type="text"
        class="button-completed-projects"
        @click="toggleCompletedProjects">
        See all completed projects
      </el-button>
    <el-collapse-transition>
      <div
        v-show="isCompletedProjectsOpen"
        class="projects-list">
        <el-card
          v-for="project in completedProjects"
          v-bind:key="project.name"
          class="project-item">
          <app-project-card
            v-bind:id="project.id"
            v-bind:name="project.name"
            v-bind:infos="project.infos"
            v-bind:disabled=true
            class="project-item" />
        </el-card>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>

import AppProjectCard from './AppProjectCard.vue';

export default {
  name: 'AppProjects',
  components: {
    AppProjectCard,
  },
  data() {
    return {
      isCompletedProjectsOpen: false,
    };
  },
  computed: {
    uncompletedProjects() {
      return this.$store.getters['projects/getUnCompletedProjects'];
    },
    completedProjects() {
      return this.$store.getters['projects/getCompletedProjects'];
    },
  },
  methods: {
    toggleCompletedProjects() {
      this.isCompletedProjectsOpen = !this.isCompletedProjectsOpen;
    },
  },
};
</script>

<style scoped lang="scss">
.project-item {
  margin-bottom: 1.2rem;

  &.completed-project-item {
    background: $--disabled;
  }
}

.button-completed-projects {
  display: block;
  margin: 2rem auto;
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
