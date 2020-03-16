<template>
  <el-row
    class="navbar"
    type="flex"
    align="middle">
    <el-col
      :span="4">
      <router-link to="/">
        <img
          src="../assets/img/logo.svg"
          alt="Projecting logo"
          class="navbar-logo" />
      </router-link>
    </el-col>
    <el-col
      :span="4"
      :offset="16"
      class="text-right">
      <router-link to="/settings" type="primary">
        <i class="el-icon-setting navbar-link" />
      </router-link>
    </el-col>
  </el-row>
</template>

<script>
</script>

<style scoped lang="scss">
.navbar {
  height: 100%;

  .navbar-logo {
    height: 24px;
  }

  .navbar-link {
    font-size: 24px;
    color: $--base-text;
  }
}
</style>
