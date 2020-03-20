<template>
  <div>
    <el-collapse v-model="activeDeadline">
      <el-collapse-item
        v-for="deadline in deadlines"
        v-bind:key="deadline.id"
        :title="'Deadline ' + (deadline.id + 1) + ' - ' + getStringfiyDate(deadline.date)"
        :name="deadline.id">
        {{ getStringfiyDate(deadline.date) }}
        <app-deadline-task
          v-bind:projectId="projectId"
          v-bind:tasks="getDeadlineTasks(tasks, deadline.id)" />
        <el-form
          :inline="true"
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
          <el-form-item>
            <el-button type="primary" @click="submitAddTask('addTaskForm', deadline.id)">Add Task</el-button>
          </el-form-item>
        </el-form>
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
        }
      });
    },
    getStringfiyDate(date) {
      const dateObject = new Date(date);
      const year = dateObject.getFullYear();
      const month = dateObject.getMonth();
      const day = dateObject.getDate();
      return `${year}/${month}/${day}`;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
