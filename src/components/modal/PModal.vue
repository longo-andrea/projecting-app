<template>
  <div class="modal">
    <div class="modal__panel">
      <div class="modal__panel__header">
        <slot name="header" />
      </div>
      <div class="modal__panel__content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PModal',
};
</script>

<style lang="scss">
.modal {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgba(#000000, .4);

  .modal__panel {
    width: 90%;
    padding: 1rem;
    position: relative;
    top: 15%;
    left: 5%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: 10% 90%;

    background-color: #ffffff;
    border-radius: $base-border-radius;

    .modal__panel__content {
      height: 100%;
    }
  }
}
</style>
