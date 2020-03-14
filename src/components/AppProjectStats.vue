<template>
  <el-card shadow="never">
    <el-row>
      <el-col :span=12 class="tasks-section">
        <p>Total tasks: {{ totalTasks }}</p>
        <p>Completed tasks: {{ completedTasks }}</p>
      </el-col>
      <el-col :span=11 :push=1>
        <p>Total deadlines: {{ totalDeadlines }}</p>
        <p>Completed deadlines: {{ completedDeadlines }}</p>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
export default {
  name: 'AppProjectStats',
  props: {
    totalTasks: {
      type: Number,
      required: true,
    },
    completedTasks: {
      type: Number,
      required: true,
    },
    totalDeadlines: {
      type: Number,
      required: true,
    },
    completedDeadlines: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.tasks-section {
  border-right: 1px solid $--lighter-border;
}
</style>
