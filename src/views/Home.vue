<template>
  <div>
    <app-quick-info class="section section-first" />
    <app-projects class="section section-last" />
    <router-link to="/add-project">
      <el-button
        type="primary"
        :circle=true
        icon="el-icon-circle-plus-outline"
        id="add-project" />
    </router-link>
  </div>
</template>

<script>
import AppQuickInfo from '../components/AppQuickInfo.vue';
import AppProjects from '../components/AppProjects.vue';

export default {
  name: 'Home',
  components: {
    AppQuickInfo,
    AppProjects,
  },
};
</script>

<style scoped lang="scss">
#add-project {
  position: fixed;
  bottom: 2rem;
  right: 1.5rem;
}
</style>
