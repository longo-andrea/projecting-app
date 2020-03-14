<template>
  <div>
    <div
      v-for="task in tasks"
      v-bind:key="task.id">
      <el-checkbox
        :checked="task.workingOn"
        label="Working On" />
      <el-checkbox
        :checked="task.completed"
        @change="completeTask(projectId, task.id)"
        label="Completed" />
      <p>{{ task.name }}</p>
      <p>{{ task.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppDeadlineTask',
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    completeTask(projectId, taskId) {
      this.$store.commit('completeTask', { projectId, taskId });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
