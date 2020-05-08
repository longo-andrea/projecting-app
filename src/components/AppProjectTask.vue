<template>
  <div>
    <div class="item">
      <p class="title">{{ task.name }}</p>
      <p class="description">{{ task.description }}</p>
      <el-row class="checkbox">
        <el-col :span=12 class="checkbox-item">
        <el-checkbox
          :disabled="task.completed"
          v-model="task.workingOn"
          @change="toggleTaskWorkingOn($event, projectId, task.id)"
          label="Working On"
          ref="workingOn" />
        </el-col>
        <el-col :span=12 class="checkbox-item">
        <el-checkbox
          v-model="task.completed"
          @change="toggleTaskCompleted($event, projectId, task.id)"
          label="Completed" />
        </el-col>
      </el-row>
      <div class="buttons-edit">
        <i class="el-icon-edit button-edit" @click="isEditTaskDialogVisible = true" />
        <i class="el-icon-delete button-delete" @click="deleteTask(projectId, task.id)" />
      </div>
      <el-dialog
        title="Edit Task"
        :visible.sync="isEditTaskDialogVisible"
        width="80%">
        <el-form
          :model="editTaskForm"
          :rules="rules"
          :hide-required-asterisk="true"
          ref="editTaskForm">
          <el-form-item label="Task name" prop="taskName">
            <el-input v-model="editTaskForm.taskName" placeholder="Type task name" />
          </el-form-item>
          <el-form-item label="Task description" prop="taskDescription">
            <el-input type="textarea" v-model="editTaskForm.taskDescription" placeholder="Type task description" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isEditTaskDialogVisible = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="submitEditTask('editTaskForm')">
            Edit Task
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppProjectTask',
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isEditTaskDialogVisible: false,
      editTaskForm: {
        taskName: this.task.name,
        taskDescription: this.task.description,
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
    toggleTaskCompleted(event, projectId, taskId) {
      this.$store.dispatch('tasks/setCompletedTask', { projectId, taskId, completed: event });
    },
    toggleTaskWorkingOn(event, projectId, taskId) {
      try {
        this.$store.dispatch('tasks/setWorkingOnTask', { projectId, taskId, workingOn: event });
      } catch (error) {
        this.$message({
          message: error,
          type: 'error',
        });
      }
    },
    deleteTask(projectId, taskId) {
      this.$store.dispatch('tasks/deleteTask', { projectId, taskId });
    },
    submitEditTask(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // store the results of form
          this.$store.dispatch('tasks/editTask', {
            projectId: this.projectId,
            taskId: this.task.id,
            taskName: this.editTaskForm.taskName,
            taskDescription: this.editTaskForm.taskDescription,
          });
          // reset the form
          this.isEditTaskDialogVisible = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item {
  position: relative;
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

.buttons-edit {
  position: absolute;
  top: 1rem;
  right: 1rem;

  .button-edit {
    margin-right: 1rem;
  }
}


</style>
