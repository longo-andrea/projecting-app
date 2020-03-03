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
          Deadlines
        </el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
import AppTasksList from './AppTasksList.vue';

export default {
  name: 'AppQuickInfo',
  components: {
    AppTasksList,
  },
  data() {
    return {
      activeTab: 'working-on',
    };
  },
};
</script>

<style scoped lang="scss">
.checkbox {
  width: 100%;
}
</style>
