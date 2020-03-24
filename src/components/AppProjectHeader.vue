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
