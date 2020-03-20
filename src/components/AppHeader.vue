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
      class="settings-icon">
      <router-link to="/settings" type="primary">
        <i class="el-icon-setting" />
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

  .settings-icon {
    text-align: right;

    i {
      font-size: 24px;
      color: $--base-text;
    }
  }
}
</style>
