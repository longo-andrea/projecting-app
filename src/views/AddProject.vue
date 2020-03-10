<template>
  <div>
    <el-form
      ref="addProjectForm"
      :model="addProjectForm"
      :rules="rules"
      label-position="left">
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
        v-for="(deadlineDate, index) in addProjectForm.deadlinesDate"
        v-bind:key="index"
        v-bind:label="'Deadline ' + (index + 1)"
        :rules="[
          { required: true, message: 'Please insert a deadline\'s date!', trigger: ['blur', 'change'] },
        ]"
        :prop="'deadlinesDate.' + index + '.value'" >
        <el-date-picker
          v-model="addProjectForm.deadlinesDate[index].value"
          type="date"
          placeholder="Pick a day"
          @change="checkDeadlineDate"
          :picker-options="deadlinesDateOptions"
          :id="'date-picker-' + index" />
      </el-form-item>
      <el-form-item>
        <el-button
          @click="addDeadline"
          :disabled="!isLastDeadlinesDateDefined"
          class="button">
          New deadline
        </el-button>
        <el-button type="primary" class="button">Add Project</el-button>
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
        deadlinesDate: [],
        maxDeadlines: 5,
        lastDeadlineDate: new Date(Date.now()),
      },
      deadlinesDateOptions: {
        disabledDate(time) {
          return time.getTime() <= Date.now();
        },
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
      },
    };
  },
  computed: {
    isLastDeadlinesDateDefined() {
      if (this.addProjectForm.deadlinesDate.length > 0) {
        return this.addProjectForm.deadlinesDate[this.addProjectForm.deadlinesDate.length - 1].value !== '';
      }
      return true;
    },
  },
  methods: {
    addDeadline() {
      if (this.addProjectForm.deadlinesDate.length < this.addProjectForm.maxDeadlines) {
        if (this.addProjectForm.deadlinesDate.length > 0) {
          const lastDeadlineDateIndex = this.addProjectForm.deadlinesDate.length - 1;
          this.addProjectForm.lastDeadlineDate = this.addProjectForm.deadlinesDate[lastDeadlineDateIndex].value;
        }
        this.addProjectForm.deadlinesDate.push({
          key: this.addProjectForm.deadlinesDate.length,
          value: '',
        });
      }
    },
    checkDeadlineDate(selectedDate) {
      if (selectedDate > this.addProjectForm.lastDeadlineDate) {
        console.log('Ok');
      } else {
        console.log('Nope');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  display: block;
  margin: 2rem 0;
}
</style>
