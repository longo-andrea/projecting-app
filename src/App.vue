<template>
  <el-container>
    <el-header
      class="header"
      height="50px">
      <app-header />
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style lang='scss'>
.header {
  background: $--base-background;
  box-shadow: 0 0 8px $--light-border;
}
</style>
