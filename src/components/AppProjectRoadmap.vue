<template>
  <div class="deadlines-list">
    <el-collapse v-model="activeDeadline" class="deadline-item">
      <el-collapse-item
        v-for="deadline in deadlines"
        v-bind:key="deadline.id"
        :name="deadline.id">
          <template slot="title">
            <el-checkbox
              v-model="deadline.completed"
              @change="toggleDeadline($event, projectId, deadline.id)"/>
              <p class="title title-deadline">Deadline {{ deadline.id + 1 }}</p>
              - {{ getStringfiyDate(deadline.date) }}
          </template>
        <div class="tasks-list">
          <app-project-task
            v-for="task in getDeadlineTasks(tasks, deadline.id)"
            v-bind:key="task.id"
            v-bind:projectId="projectId"
            v-bind:task="task"
            v-bind:taskCompleted="task.completed"
            class="task-item" />
        </div>
        <el-button
          type="plain"
          @click="isAddTaskDialogVisible = true">
            Add Task
        </el-button>
        <el-dialog
          title="Add Task"
          :visible.sync="isAddTaskDialogVisible"
          width="80%">
          <el-form
            :model="addTaskForm"
            :rules="rules"
            :hide-required-asterisk="true"
            ref="addTaskForm">
            <el-form-item label="Task name" prop="taskName">
              <el-input v-model="addTaskForm.taskName" placeholder="Type task name" />
            </el-form-item>
            <el-form-item label="Task description" prop="taskDescription">
              <el-input type="textarea" v-model="addTaskForm.taskDescription" placeholder="Type task description" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="isAddTaskDialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="submitAddTask('addTaskForm', deadline.id)">Add Task</el-button>
          </span>
        </el-dialog>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import AppProjectTask from './AppProjectTask.vue';

export default {
  name: 'AppProjectRoadmap',
  components: {
    AppProjectTask,
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
      isAddTaskDialogVisible: false,
      addTaskForm: {
        taskName: '',
        taskDescription: '',
      },
      rules: {
        taskName: [
          { required: true, message: 'Please insert task\'s name', trigger: 'blur' },
        ],
        taskDescription: [
          { required: true, message: 'Please insert task\'s description', trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    getDeadlineTasks(tasks, deadlineId) {
      return tasks.filter((task) => task.deadlineId === deadlineId)
        || [];
    },
    submitAddTask(formName, deadlineId) {
      this.$refs[formName][deadlineId].validate((valid) => {
        if (valid) {
          // store the results of form
          this.$store.dispatch('tasks/addTask', {
            projectId: this.projectId,
            deadlineId,
            taskName: this.addTaskForm.taskName,
            taskDescription: this.addTaskForm.taskDescription,
          });
          // reset the form
          this.$refs[formName][deadlineId].resetFields();
          this.isAddTaskDialogVisible = false;
        }
      });
    },
    getStringfiyDate(date) {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      return `${year}/${month + 1}/${day}`;
    },
    toggleDeadline(event, projectId, deadlineId) {
      this.$store.dispatch('deadlines/setCompletedDeadline', { projectId, deadlineId, completed: event });
    },
  },
};
</script>

<style lang="scss" scoped>
.title-deadline {
  margin: 0;
  margin-left: .3rem;
  font-weight: $--font-bold;
  font-size: $--font-size-base;
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
