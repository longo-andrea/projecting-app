<template>
  <div>
    <el-form
      ref="form"
      :model="addProjectForm"
      label-position="top">
      <el-form-item
        label="Project Name"
        :required="true">
        <el-input
          v-model="addProjectForm.projectName"
          placeholder="Type project name here" />
      </el-form-item>
      <el-form-item
        label="Project Description"
        :required="true">
        <el-input
          type="textarea"
          rows="5"
          v-model="addProjectForm.projectDescription" />
      </el-form-item>
      <el-form-item
        label="Project Deadlines"
        :required="true">
        <el-input-number
          v-model="addProjectForm.projectDeadlines"
          :min="1"
          :max="5"
          controls-position="right"
          size="small" />
      </el-form-item>
      <el-form-item
        label="Deadline 1"
        :required="true">
        <el-date-picker
          v-model="addProjectForm.deadlineDate"
          type="date"
          placeholder="Pick a day" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    return {
      addProjectForm: {
        projectName: '',
        projectDescription: '',
        projectDeadlines: 0,
        deadlineDate: '',
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
