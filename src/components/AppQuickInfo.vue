<template>
  <div>
    <el-tabs
      v-model="activeTab"
      type="border-card"
      :stretch="true">
      <el-tab-pane
        label="Working on"
        name="working-on">
        <app-quick-tasks />
        </el-tab-pane>
      <el-tab-pane
        label="Deadlines"
        name="deadlines">
        <app-quick-deadlines />
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import AppQuickDeadlines from './AppQuickDeadlines.vue';
import AppQuickTasks from './AppQuickTasks.vue';

export default {
  name: 'AppQuickInfo',
  components: {
    AppQuickTasks,
    AppQuickDeadlines,
  },
  data() {
    return {
      activeTab: 'working-on',
    };
  },
};
</script>

<style scoped lang="scss">
</style>
