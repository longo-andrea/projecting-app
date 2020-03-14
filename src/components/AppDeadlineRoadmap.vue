<template>
  <div class="deadline-section">
    <el-collapse v-model="activeDeadline">
      <el-collapse-item
        v-for="deadline in deadlines"
        v-bind:key="deadline.id"
        :title="'Deadline ' + (deadline.id + 1) + ' - ' + deadline.date"
        :name="deadline.id">
        {{ deadline.date }}
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'AppDeadlineRoadmap',
  props: {
    deadlines: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeDeadline: [0],
    };
  },
};
</script>

<style lang="scss" scoped>
.deadline-section {
  margin: 2rem 0;
}
</style>
