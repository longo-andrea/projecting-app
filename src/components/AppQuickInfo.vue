<template>
  <div>
    <el-tabs
      v-model="activeTab"
      type="border-card"
      :stretch="true">
      <el-tab-pane
        label="Working on"
        name="working-on">Working on</el-tab-pane>
      <el-tab-pane
        label="Deadlines"
        name="deadlines">Deadlines</el-tab-pane>
  </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'AppQuickInfo',
  data() {
    return {
      activeTab: 'working-on',
    };
  },
};
</script>

<style scoped lang="scss">
</style>
