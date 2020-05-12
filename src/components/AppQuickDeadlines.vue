<template>
  <div class="deadlines-list">
    <el-card
      v-for="deadline in incomingDeadlines"
      v-bind:key="deadline.projectId"
      class="deadline-item"
      shadow="hover">
      <app-quick-deadline
        v-bind:projectId="deadline.projectId"
        v-bind:deadlineId="deadline.id" />
    </el-card>
  </div>
</template>

<script>
import AppQuickDeadline from './AppQuickDeadline.vue';

export default {
  name: 'AppQuickDeadlines',
  components: {
    AppQuickDeadline,
  },
  computed: {
    incomingDeadlines() {
      const projects = this.$store.getters['projects/getUnCompletedProjects'];
      const deadlines = this.$store.getters['deadlines/getUncompletedDeadlines'];
      const incomingDeadlines = [];

      if (projects.length && deadlines.length) {
        projects.forEach((project) => {
          incomingDeadlines.push(
            deadlines.find((deadline) => !deadline.completed && deadline.projectId === project.id),
          );
        });
      }

      return incomingDeadlines;
    },
  },
};
</script>

<style scoped lang="scss">
.deadlines-list {
  max-height: 70vh;
  overflow: scroll;
  overflow-x: hidden;

  .deadline-item {
    margin-bottom: 1.2rem;
  }
}

@media screen and (min-width: $--md-screen) {
  .deadlines-list {
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
    align-content: start;

    .deadline-item {
      margin-left: 2.5%;
      margin-right: 2.5%;
      flex-basis: 45%;
    }
  }
}

@media screen and (min-width: $--bg-screen) {
  .deadlines-list {
    height: 60vh;
  }
}
</style>
