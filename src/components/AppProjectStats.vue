<template>
  <el-card shadow="never">
    <el-row
      type="flex"
      justify="center">
      <el-col :span=12 class="info-item">
        <p>Tasks:</p>
        <p>{{ completedTasks }} / {{ totalTasks }}</p>
      </el-col>
      <el-col :span=12 class="info-item">
        <p>Deadlines:</p>
        <p>{{ completedDeadlines }} / {{ totalDeadlines }}</p>
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
.info-item {
  text-align: center;
}
</style>
