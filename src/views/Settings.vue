<template>
  <div>
    <div>
      <h2>Max deadlines for a project</h2>
      <el-input-number
        v-model="maxDeadlines"
        @change="updateMaxDeadlines"
        :min="1"
        :max="6" />
    </div>
    <el-divider />
    <router-link to="/about">About</router-link>
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

<style>
</style>
