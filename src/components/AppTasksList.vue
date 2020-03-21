<template>
  <div class="tasks-list">
    <el-card class="task-item"
      v-for="task in workingTasks"
      :key="task.name"
      shadow="hover">
      <app-task
        v-bind:taskId="task.taskId"
        v-bind:name="task.taskName"
        v-bind:description="task.taskDescription"
        v-bind:projectId="task.projectId"
        v-bind:project="task.projectName"
        v-bind:deadline="task.taskDeadline"/>
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
      const workingTasks = this.$store.getters.getWorkingOnTasks;
      return workingTasks;
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
