<template>
  <div class="homepage">
    <p-navbar />

    <router-view />
  </div>
</template>

<script>
import PNavbar from '@/components/navbar/index';

export default {
  name: 'Homepage',
  components: {
    PNavbar,
  },
};
</script>

<style lang="scss">
.homepage {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 4rem auto;
}
</style>
