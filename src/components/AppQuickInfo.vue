<template>
  <div>
    <el-tabs
      v-model="activeTab"
      type="border-card"
      :stretch="true">
      <el-tab-pane
        label="Working on"
        name="working-on">
        <app-tasks-list />
        </el-tab-pane>
      <el-tab-pane
        label="Deadlines"
        name="deadlines">
        <app-deadlines-list />
      </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import AppTasksList from './AppTasksList.vue';
import AppDeadlinesList from './AppDeadlinesList.vue';

export default {
  name: 'AppQuickInfo',
  components: {
    AppTasksList,
    AppDeadlinesList,
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
