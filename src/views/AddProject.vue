<template>
  <div>
    <h1 class="title">Add project</h1>
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
        prop="projectDescription" >
        <el-input
          type="textarea"
          rows="5"
          v-model="addProjectForm.projectDescription" />
      </el-form-item>
      <el-form-item
        v-for="(deadlineDate, index) in addProjectForm.deadlinesDate"
        v-bind:key="index"
        v-bind:label="'Deadline ' + (index + 1)"
        :rules="{ required: true, message: 'Please input deadline\'s date!', trigger: ['blur', 'change'] }"
        :prop="'deadlinesDate.' + index + '.date'">
        <el-date-picker
          v-model="addProjectForm.deadlinesDate[index].date"
          type="date"
          placeholder="Pick a day"
          @change="checkDeadlineDate($event, index)"
          :picker-options="deadlinesDateOptions" />
        <p class="deadline-error">{{ deadlineDate.error }}</p>
      </el-form-item>
      <el-form-item>
        <el-button
          @click="addDeadline"
          :disabled="!isLastDeadlinesDateDefined || isDeadlinesDateFull"
          class="button">
          Add
        </el-button>
        <el-button
          @click="removeDeadline"
          :disabled="isDeadlinesDateEmpty"
          class="button">
          Remove
        </el-button>
        <el-button
          @click="submitForm('addProjectForm')"
          type="primary"
          class="button" id="submit-button">Add Project</el-button>
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
        deadlinesDate: [{
          key: 0,
          date: '',
          previousDate: new Date(Date.now()),
          error: '',
        }],
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
    maxDeadlines() {
      return this.$store.getters['settings/getMaxDeadlinesForProject'];
    },
    isLastDeadlinesDateDefined() {
      // if there is at least one deadline
      if (this.addProjectForm.deadlinesDate.length > 0) {
        // wether last deadline's date it's alredy been defined
        return this.addProjectForm.deadlinesDate[this.addProjectForm.deadlinesDate.length - 1].date !== '';
      }
      // if there is no deadlines
      return true;
    },
    isDeadlinesDateFull() {
      if (this.addProjectForm.deadlinesDate.length === this.maxDeadlines) {
        return true;
      }
      return false;
    },
    isDeadlinesDateEmpty() {
      if (this.addProjectForm.deadlinesDate.length === 1) {
        return true;
      }
      return false;
    },
  },
  methods: {
    addDeadline() {
      // check if there if deadlines's count haven't reached the limit
      if (this.addProjectForm.deadlinesDate.length < this.maxDeadlines) {
        let previousDate = new Date(Date.now());
        // if there is more than one deadline, set previous date correctly
        if (this.addProjectForm.deadlinesDate.length > 0) {
          const lastDeadlineDateIndex = this.addProjectForm.deadlinesDate.length - 1;
          previousDate = this.addProjectForm.deadlinesDate[lastDeadlineDateIndex].date;
        }
        this.addProjectForm.deadlinesDate.push({
          key: this.addProjectForm.deadlinesDate.length,
          date: '',
          previousDate,
          error: '',
        });
      }
    },
    removeDeadline() {
      if (this.addProjectForm.deadlinesDate.length > 1) {
        this.addProjectForm.deadlinesDate.splice(this.addProjectForm.deadlinesDate.length - 1, 1);
      }
    },
    checkDeadlineDate(selectedDate, index) {
      // check if selected date is at least next the previous one
      if (selectedDate > this.addProjectForm.deadlinesDate[index].previousDate) {
        this.addProjectForm.deadlinesDate[index].error = '';
      } else {
        this.addProjectForm.deadlinesDate[index].error = 'Select a later date!';
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // store the results of form
          this.$store.dispatch('projects/addProject', {
            projectName: this.addProjectForm.projectName,
            projectDescription: this.addProjectForm.projectDescription,
            deadlinesDate: this.addProjectForm.deadlinesDate,
          });
          // reset the form
          this.$refs[formName].resetFields();
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin: 1rem 0;
  margin-right: .5rem;

  &#submit-button {
    display: block;
  }
}
.deadline-error {
  color: $--danger;
}
</style>
