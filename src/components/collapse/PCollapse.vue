<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PCollapse',
};
</script>

<style lang="scss">
.collapse {
  width: 100%;
  margin: .5rem 0;
  padding: .5rem .3rem;
}
</style>
