<template>
  <div class="deadline-section">
    <el-collapse v-model="activeDeadline">
      <el-collapse-item
        v-for="deadline in deadlines"
        v-bind:key="deadline.id"
        :title="'Deadline ' + (deadline.id + 1) + ' - ' + deadline.date"
        :name="deadline.id">
        {{ deadline.date }}
        <app-deadline-task
          v-bind:projectId="projectId"
          v-bind:tasks="getDeadlineTasks(tasks, deadline.id)" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import AppDeadlineTask from './AppDeadlineTask.vue';

export default {
  name: 'AppDeadlineRoadmap',
  components: {
    AppDeadlineTask,
  },
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    deadlines: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeDeadline: [0],
    };
  },
  methods: {
    getDeadlineTasks: (tasks, index) => tasks.filter((task) => task.deadlineIndex === index),
  },
};
</script>

<style lang="scss" scoped>
.deadline-section {
  margin: 2rem 0;
}
</style>
