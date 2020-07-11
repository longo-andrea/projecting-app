<template>
  <div class="collapse-item">
    <div class="collapse-item__header" @click="toggleOpen">
      <h2 class="collapse-item__header__title">{{ title }}</h2>
      <img src="@/assets/img/arrow-down.svg" alt="open deadline" class="collapse-item__header__icon" />
    </div>
    <div class="collapse-item__content" v-if="isOpen">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PCollapseItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      isOpen: this.isActive,
    };
  },
  watch: {
    isActive(isActive) {
      this.isOpen = isActive;
    },
  },
  methods: {
    toggleOpen() {
      this.isOpen = !this.isOpen;

      // an event is emitted outside
      this.$emit('tabOpened', this.title);
    },
  },
};
</script>

<style lang="scss">
.collapse-item {
  .collapse-item__header {
    margin-bottom: .5rem;
    padding: .5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    border-bottom: $dark-border;

    .collapse-item__header__title {
      font-size: $base-font-size;
      font-weight: $font-semi-bold;
    }

    .collapse-item__header__icon {
      width: .8rem;
    }
  }

  .collapse-item__content {
    padding: 0 .5rem;
  }
}
</style>
