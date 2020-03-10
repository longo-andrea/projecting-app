<template>
  <div>
    <el-form
      ref="addProjectForm"
      :model="addProjectForm"
      :rules="rules"
      label-position="top">
      <el-form-item
        label="Project Name"
        prop="projectName">
        <el-input
          v-model="addProjectForm.projectName"
          placeholder="Type project name here" />
      </el-form-item>
      <el-form-item
        label="Project Description"
        prop="projectDescription">
        <el-input
          type="textarea"
          rows="5"
          v-model="addProjectForm.projectDescription" />
      </el-form-item>
      <el-form-item
        label="Project Deadlines"
        prop="projectDeadlines">
        <el-input-number
          v-model="addProjectForm.projectDeadlines"
          :min="1"
          :max="5"
          controls-position="right"
          size="small" />
      </el-form-item>
      <el-form-item
        label="Deadline 1"
        prop="deadlineDate">
        <el-date-picker
          v-model="addProjectForm.deadlineDate"
          type="date"
          placeholder="Pick a day" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('addProjectForm')">Add Project</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    const checkDeadlineDate = (rule, value, callback) => {
      const now = new Date();
      if (!value) {
        callback(new Error('Please input a deadline\'s date!'));
      } else if (now >= value) {
        callback(new Error('Please input a valid deadline\'s date!'));
      }
      callback();
    };
    return {
      addProjectForm: {
        projectName: '',
        projectDescription: '',
        projectDeadlines: 0,
        deadlineDate: '',
      },
      rules: {
        projectName: [
          {
            required: true, message: 'Please input project name!', trigger: 'blur',
          },
          {
            min: 1, max: 30, message: 'Length should be 1 to 30!', trigger: 'blur',
          },
        ],
        projectDescription: [
          {
            required: true, message: 'Please input project description!', trigger: 'blur',
          },
          {
            min: 1, max: 300, message: 'Length should be 1 to 300!', trigger: 'blur',
          },
        ],
        projectDeadlines: [
          {
            required: true, message: 'Please input the number of project\'s deadlines!', trigger: 'blur',
          },
        ],
        deadlineDate: [
          {
            validator: checkDeadlineDate, trigger: 'blur',
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
