<template>
  <div class="tasks-list">
    <div
      v-for="task in tasks"
      v-bind:key="task.id"
      class="task-item">
      <p class="title">{{ task.name }}</p>
      <p class="description">{{ task.description }}</p>
      <el-row class="checkbox">
        <el-col :span=12 class="checkbox-item">
        <el-checkbox
          :checked="task.workingOn"
          @change="toggleTaskWorkingOn($event, projectId, task.id)"
          :key="workingOnCheckboxKey"
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
  data() {
    return {
      workingOnCheckboxKey: 0,
    };
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
        try {
          this.$store.commit('workingOnTask', { projectId, taskId });
        } catch (error) {
          this.$message({
            message: error,
            type: 'error',
          });
          this.workingOnCheckboxKey += 1;
        }
      } else {
        this.$store.commit('unworkingOnTask', { projectId, taskId });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.task-item {
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

@media screen and (min-width: $--md-screen) {
  .tasks-list {
    display: flex;
    flex-wrap: wrap;

    .task-item {
      flex-basis: 48%;

      &:not(:nth-child(2n)) {
        margin-right: 4%;
      }
    }
  }
}

@media screen and (min-width: $--bg-screen) {
  .tasks-list {
    display: flex;
    flex-wrap: wrap;

    .task-item {
      flex-basis: 30%;

      &:not(:nth-child(2n)) {
        margin-right: 0;
      }

      &:not(:nth-child(3n)) {
        margin-right: 5%;
      }
    }
  }
}
</style>
