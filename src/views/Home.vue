<template>
  <div>
    <app-quick-info class="section section-first" />
    <app-projects-list class="section section-first" />
  </div>
</template>

<script>
import AppQuickInfo from '../components/AppQuickInfo.vue';
import AppProjectsList from '../components/AppProjectsList.vue';

export default {
  name: 'Home',
  components: {
    AppQuickInfo,
    AppProjectsList,
  },
};
</script>
