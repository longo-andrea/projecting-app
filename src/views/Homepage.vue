<template>
  <div>
    <p-navbar />
    <h1>Hoempage</h1>
  </div>
</template>

<script>
import PNavbar from '@/components/PNavbar.vue';

export default {
  name: 'Homepage',
  components: {
    PNavbar,
  },
  mounted() {
    this.$store.dispatch('deadlines/initState');
  },
};
</script>

<style lang="scss">
</style>
