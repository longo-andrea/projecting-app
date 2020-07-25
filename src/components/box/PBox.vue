<template>
  <div class="box">
    <div :class="{ 'box__header': $slots.header }">
      <slot name="header" />
    </div>
    <div class="box__content">
      <slot name="content" class="box__content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PBox',
};
</script>

<style lang="scss">
.box {
  width: 100%;
  padding: .4rem .5rem;
  margin: .5rem 0;

  border: $base-border;
  border-radius: $base-border-radius;

  .box__header {
    margin: .5rem 0;
    padding-bottom: 1rem;

    border-bottom: $darken-border;
    font-weight: $font-bold;
    font-size: 1.5rem;
  }

  .box__content {
    margin: .5rem 0;
  }
}
</style>
