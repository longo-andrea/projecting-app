<template>
  <div class="roadmap">
    <div class="roadmap__list">
      <div
        class="roadmap__list__item"
        v-for="(item, index) in itemsList"
        :key="index">
        <div class="roadmap__list__item__icon"></div>
        <slot v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PRoadmap',
  props: {
    itemsList: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.roadmap {

  .roadmap__list {
    padding-left: .5rem;
    list-style-type: none;

    .roadmap__list__item {
      margin-top: 1rem;
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .roadmap__list__item__icon {
        position: relative;
        flex-basis: 1.2rem;
        flex-shrink: 0;
        flex-grow: 0;
        margin-right: .5rem;
        width: 1.2rem;
        height: 1.2rem;

        background-color: $primary-color;
        border-radius: 50%;
        display: inline-block;
      }

      &:not(:last-child) {
        .roadmap__list__item__icon::after {
          content: "";
          width: .15rem;
          height: 3rem;
          position: absolute;
          bottom: -2rem;
          left: .45rem;

          background-color: $primary-color;
          border: 1px solid $primary-color;
        }

      }
    }
  }
}
</style>
