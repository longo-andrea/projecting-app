<template>
  <div class="deadlines-list">
    <el-collapse v-model="activeDeadline" class="deadline-item">
      <el-collapse-item
        v-for="deadline in deadlines"
        v-bind:key="deadline.id"
        :name="deadline.id">
        <template slot="title">
          <span class="title title-deadline">
            Deadline {{ deadline.id + 1 }}
          </span>
          - {{ getStringfiyDate(deadline.date) }}
        </template>
        <app-deadline-task
          v-bind:projectId="projectId"
          v-bind:tasks="getDeadlineTasks(tasks, deadline.id)" />
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
    getDeadlineTasks: (tasks, index) => tasks.filter((task) => task.deadlineIndex === index),
    submitAddTask(formName, deadlineId) {
      this.$refs[formName][deadlineId].validate((valid) => {
        if (valid) {
          // store the results of form
          this.$store.commit('addTask', {
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
  },
};
</script>

<style lang="scss" scoped>
.title-deadline {
  margin: .3rem;
  font-weight: $--font-bold;
  font-size: $--font-size-base;
}

@media screen and (min-width: $--md-screen) {

}
</style>
