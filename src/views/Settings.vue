<template>
  <div>
    <h1 class="title">Settings</h1>
    <div>
      <h2 class="subtitle">Project</h2>
      <p class="description">Max deadlines for a project</p>
      <el-input-number
        v-model="maxDeadlines"
        @change="updateMaxDeadlines"
        :min="1"
        :max="6" />
    </div>
    <el-divider />
    <router-link to="/about">
      <h2 class="subtitle">About</h2>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  data() {
    return {
      maxDeadlines: this.$store.state.settings.project.maxDeadlines,
    };
  },
  methods: {
    updateMaxDeadlines(maxDeadlinesCount) {
      this.$store.commit('updateMaxDeadlinesSetting', { maxDeadlinesCount });
    },
  },
};
</script>

<style scoped lang="scss">
</style>
