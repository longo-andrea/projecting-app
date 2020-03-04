<template>
  <div class="tasks-list">
    <el-card class="task-item"
      v-for="task in workingTasks"
      :key="task.name"
      shadow="hover">
      <app-task
        v-bind:name="task.name"
        v-bind:description="task.description"
        v-bind:project="task.project"
        v-bind:deadline="task.deadline"/>
    </el-card>
  </div>
</template>

<script>
import AppTask from './AppTask.vue';

export default {
  name: 'AppTasksList',
  components: {
    AppTask,
  },
  computed: {
    workingTasks() {
      const workingTasks = this.$store.state.workingOnTasks.filter((task) => !task.completed);
      return workingTasks;
    },
  },
};
</script>

<style scoped lang="scss">
.tasks-list {
  max-height: 70vh;
  overflow: scroll;

  .task-item {
    margin-bottom: 1.2rem;
  }
}
</style>
