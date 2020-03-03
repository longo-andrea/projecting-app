<template>
  <div>
    <el-card class="card"
      v-for="task in workingTasks"
      :key="task.name"
      shadow="hover">
      <app-task
        v-bind:name="task.name"
        v-bind:description="task.description"
        v-bind:project="task.project"
        v-bind:deadline="task.deadline" />
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
      return this.$store.state.workingOnTasks;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1.2rem;
}
</style>
