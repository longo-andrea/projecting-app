<template>
  <div class="summary__content__projects-list">
    <!-- Uncompleted projects list -->
    <p-box
      class="summary__content__projects-list__item"
      v-for="project in uncompletedProjects"
      :key="project.id">
      <template #header>
        <router-link :to="`project/${project.id}`">{{ project.name }}</router-link>
      </template>
      <template #content>
        {{ project.description }}
      </template>
    </p-box>

    <!-- Complted projects list -->
    <div class="summary__content__projects-list__completed-projects">
      <p class="summary__content__projects-list__completed-projects__toggler" @click="toggleUncompletedProjects">See completed projects</p>
      <p-box
        v-show="isUncompletedProjectsOpen"
        class="summary__content__projects-list__item"
        v-for="project in completedProjects"
        :key="project.id">
        <template #header>
          <router-link :to="`project/${project.id}`">{{ project.name }}</router-link>
        </template>
        <template #content>
          {{ project.description }}
        </template>
      </p-box>
    </div>
  </div>
</template>

<script>
import PBox from '@/components/box/index';

export default {
  name: 'ProjectsList',
  components: {
    PBox,
  },
  props: {
    uncompletedProjects: {
      type: Array,
      required: true,
    },
    completedProjects: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isUncompletedProjectsOpen: false,
    };
  },
  methods: {
    toggleUncompletedProjects() {
      this.isUncompletedProjectsOpen = !this.isUncompletedProjectsOpen;
    },
  },
};
</script>

<style lang="scss">
.summary__content__projects-list {
  margin: 1rem 0;

  .summary__content__projects-list__item {
    margin: 1rem 0;
  }

  .summary__content__projects-list__completed-projects {
    .summary__content__projects-list__completed-projects__toggler {
      margin-top: 3rem;

      font-weight: $font-semi-bold;
      color: $primary-color;
      text-align: center;
    }
  }
}
</style>
