<template>
  <div class="card">
    <div class="card__header">
      <slot name="header" />
    </div>
    <div class="card__content">
      <slot name="content" class="card__content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCard',
};
</script>

<style lang="scss">
.card {
  width: 100%;
  padding: .5rem;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 3rem calc(100% - 3rem);

  border: $base-border;
  border-radius: $base-border-radius;
  box-shadow: 0 0 4px rgba($base-color, .3);

  .card__header {
    align-self: center;
  }

  .card__content {
    overflow-x: hidden;
  }
}
</style>
