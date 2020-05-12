<template>
  <div class="tasks-list">
    <el-card class="task-item"
      v-for="task in workingTasks"
      :key="task.name"
      shadow="hover">
      <app-quick-task
        v-bind:taskId="task.id"
        v-bind:name="task.name"
        v-bind:description="task.description"
        v-bind:projectId="task.projectId"
        v-bind:deadlineId="task.deadlineId" />
    </el-card>
  </div>
</template>

<script>
import AppQuickTask from './AppQuickTask.vue';

export default {
  name: 'AppQuickTasks',
  components: {
    AppQuickTask,
  },
  computed: {
    workingTasks() {
      return this.$store.getters['tasks/getWorkingOnTasks'];
    },
  },
};
</script>

<style scoped lang="scss">
.tasks-list {
  max-height: 70vh;
  overflow: scroll;
  overflow-x: hidden;

  .task-item {
    margin-bottom: 1.2rem;
  }
}

@media screen and (min-width: $--md-screen) {
  .tasks-list {
    height: 30vh;
    display: flex;
    flex-wrap: wrap;
    align-content: start;

    .task-item {
      margin-left: 2.5%;
      margin-right: 2.5%;
      flex-basis: 45%;
    }
  }
}

@media screen and (min-width: $--bg-screen) {
  .tasks-list {
    height: 60vh;
  }
}
</style>
