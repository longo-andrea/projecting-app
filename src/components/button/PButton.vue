<template>
  <div
    class="button"
    :class="[
      color ? `button--${color}` : '',
      size ? `button--${size}` : '',
      rounded ? 'button--rounded' : '',
      disabled ? 'button--disabled' : '',
    ]"
    @click="buttonClicked">
    <slot name="content">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'PButton',
  props: {
    color: {
      type: String,
      required: false,
    },
    size: {
      type: String,
      required: false,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  methods: {
    buttonClicked() {
      this.$emit('buttonClicked');
    },
  },
};
</script>

<style lang="scss">
.button {
  display: inline-block;
  padding: .5rem 1.2rem;

  border: $base-border;
  border-radius: $base-border-radius;

  font-size: 1.2rem;
  font-weight: $font-semi-bold;
  text-transform: uppercase;

  &:hover {
    border-color: $primary-color;
    color: lighten($base-color, 10%);
    background-color: rgba($primary-color, .4);

    cursor: pointer;
  }

  &.button--disabled {
    color: rgba($base-color, .3);
  }

  &.button--simple {
    border: none;
    background-color: none;
    color: $light-color;

    &:hover {
      color: $base-color;
      background-color: darken($primary-color, 7%);
    }

    &.button--disabled {
      color: rgba($base-color, .3);
    }
  }

  &.button--primary {
    border: 1px solid darken($primary-color, 10%);
    background-color: $primary-color;
    color: #ffffff;

    &:hover {
      background-color: darken($primary-color, 7%);
    }

    &.button--disabled {
      border: 1px solid rgba($primary-color, .4);
      background-color: rgba($primary-color, .4);
    }
  }

  &.button--xs {
    padding: .2rem .5rem;
    font-size: .7rem;
  }

  &.button--rounded {
    width: 3rem;
    height: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 100%;
  }
}
</style>
