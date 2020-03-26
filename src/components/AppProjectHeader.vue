<template>
  <div>
    <el-row
      type="flex"
      align="middle">
      <el-col :span=1>
        <el-checkbox
        :checked="isProjectCompleted"
          @change="toggleProjectCompleted($event, projectId)" />
      </el-col>
      <el-col :span=23>
        <h1 class="title title-big">{{ projectName }}</h1>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span=24>
        <h2 class="subtitle">{{ projectInfo }}</h2>
      </el-col>
    </el-row>
    <div class="buttons-edit">
      <i class="el-icon-edit button-edit" @click="isEditProjectDialogVisible = true" />
      <i class="el-icon-delete button-delete" @click="deleteProject()" />
    </div>
    <el-dialog
      title="Edit Project"
      :visible.sync="isEditProjectDialogVisible"
      width="80%">
      <el-form
        :model="editProjectForm"
        :rules="rules"
        :hide-required-asterisk="true"
        ref="editProjectForm">
        <el-form-item label="Project name" prop="projectName">
          <el-input v-model="editProjectForm.projectName" placeholder="Type project name" />
        </el-form-item>
        <el-form-item label="Project description" prop="projectDescription">
          <el-input
            type="textarea"
            v-model="editProjectForm.projectDescription"
            placeholder="Type project description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isEditProjectDialogVisible = false">Cancel</el-button>
        <el-button
          @click="submitEditProject('editProjectForm')"
          type="primary">
          Edit Task
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'AppProject',
  props: {
    projectId: {
      type: Number,
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectInfo: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isEditProjectDialogVisible: false,
      editProjectForm: {
        projectName: this.projectName,
        projectDescription: this.projectInfo,
      },
      rules: {
        projectName: [
          { required: true, message: 'Please insert project\'s name', trigger: 'blur' },
        ],
        projectDescription: [
          { required: true, message: 'Please insert project\'s description', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {
    isProjectCompleted() {
      return this.$store.getters.getProjects
        .find((project) => project.id === this.projectId).completed;
    },
  },
  methods: {
    toggleProjectCompleted(event, projectId) {
      if (event) {
        this.$store.dispatch('completeProject', projectId);
        this.$emit('project-completed', projectId);
      } else {
        this.$store.commit('uncompleteProject', { projectId });
      }
    },
    deleteProject() {
      this.$router.replace('/');
      this.$store.commit('deleteProject', { projectId: this.projectId });
    },
    submitEditProject(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // store the results of form
          this.$store.commit('editProject', {
            projectId: this.projectId,
            projectName: this.editProjectForm.projectName,
            projectDescription: this.editProjectForm.projectDescription,
          });
          // reset the form
          this.isEditProjectDialogVisible = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  margin: 0;
}

.subtitle {
  margin: 0;
}
</style>
