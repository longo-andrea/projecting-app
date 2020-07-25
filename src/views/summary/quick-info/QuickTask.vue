<template>
  <p-box
    class="summary__content__summary__tabs__tab__item">
    <template #header>
      <div class="summary__content__summary__tabs__tab__item__header" @click="toggleTaskOpen">
        {{ task.name }}
        <span @click="setTaskCompleted">
          <i class="fa fa-check summary__content__summary__tabs__tab__item__header__icon"></i>
        </span>
      </div>
    </template>
    <template #content>
      <div v-show="isOpen" class="summary__content__summary__tabs__tab__item__content">
        {{ task.description }}
      </div>
    </template>
  </p-box>
</template>

<script>
import PBox from '@/components/box/index';

export default {
  name: 'QuickTask',
  components: {
    PBox,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    toggleTaskOpen() {
      this.isOpen = !this.isOpen;
    },
    setTaskCompleted() {
      this.$store.dispatch('tasks/setTaskCompleted', { taskId: this.task.id, completed: true });
    },
  },
};
</script>

<style lang="scss">
.summary__content__summary__tabs__tab__item {
  margin: 1rem 0;

  .box__header {
    padding-bottom: 0;

    border-bottom: none;
  }

  .summary__content__summary__tabs__tab__item__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      &:hover,
      &:focus {
        color: $success-color;
      }
    }
    .summary__content__summary__tabs__tab__item__header__icon {
      width: 1rem;
    }
  }

  .summary__content__summary__tabs__tab__item__content {
    padding-top: .5rem;

    border-top: $base-border;
  }
}
</style>
