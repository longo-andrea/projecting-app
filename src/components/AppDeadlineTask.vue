<template>
  <div>
    <div
      v-for="task in tasks"
      v-bind:key="task.id"
      class="task">
      <p class="title">{{ task.name }}</p>
      <p class="description">{{ task.description }}</p>
      <el-row class="checkbox">
        <el-col :span=12 class="checkbox-item">
        <el-checkbox
          :checked="task.workingOn"
          @change="toggleTaskWorkingOn($event, projectId, task.id)"
          label="Working On" />
        </el-col>
        <el-col :span=12 class="checkbox-item">
        <el-checkbox
          :checked="task.completed"
          @change="toggleTaskCompleted($event, projectId, task.id)"
          label="Completed" />
        </el-col>
      </el-row>
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
    toggleTaskCompleted(event, projectId, taskId) {
      if (event) {
        this.$store.commit('completeTask', { projectId, taskId });
      } else {
        this.$store.commit('uncompleteTask', { projectId, taskId });
      }
    },
    toggleTaskWorkingOn(event, projectId, taskId) {
      if (event) {
        this.$store.commit('workingOnTask', { projectId, taskId });
      } else {
        this.$store.commit('unworkingOnTask', { projectId, taskId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  margin-bottom: .5rem;
  padding: 1rem;
  border: 1px solid $--lighter-border;
  border-radius: 4px;
}

.title {
  margin: 0;
}

.description {
  margin: 0;
  margin-bottom: 1rem;
}

.checkbox {
  padding-top: 1rem;
  border-top: 1px solid $--lighter-border;

  .checkbox-item {
    text-align: center;
  }
}
</style>
