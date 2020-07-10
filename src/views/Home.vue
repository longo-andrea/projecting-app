<template>
  <div class="home">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'Home',
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;

  .page {
    height: 100%;
    padding: .5rem;

    .page__title {
      margin: 1.5rem .5rem;

      font-size: $big-font-size;
      font-weight: $font-bold;
    }
  }
}
</style>
