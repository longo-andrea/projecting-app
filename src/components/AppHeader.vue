<template>
  <el-row>
    <el-col :span="12">
      logo
    </el-col>
    <el-col :span="12">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
};
</script>

<style scoped lang="scss">
</style>
