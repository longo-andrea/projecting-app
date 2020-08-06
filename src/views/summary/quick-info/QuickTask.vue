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
      <transition name="collapse-task">
        <div
          v-show="isOpen"
          class="summary__content__summary__tabs__tab__item__content"
          :class="{
            'summary__content__summary__tabs__tab__item__content--open': isOpen
          }">
          <p class="summary__content__summary__tabs__tab__item__content__description">{{ task.description }}</p>
          <router-link :to="`project/${project.id}`" class="summary__content__summary__tabs__tab__item__content__info">
            {{ project.name }}
          </router-link>
        </div>
      </transition>
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
      project: {},
    };
  },
  mounted() {
    this.project = this.$store.getters['projects/getProjects']
      .find((project) => project.id === this.task.projectId);
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

  .box__content {
    margin: 0;
  }

  .summary__content__summary__tabs__tab__item__content {
    &.summary__content__summary__tabs__tab__item__content--open {
      padding-top: .5rem;

      border-top: $base-border;
    }

    .summary__content__summary__tabs__tab__item__content__description {
      margin-bottom: .8rem;
    }

    .summary__content__summary__tabs__tab__item__content__info {
      display: block-inline;

      font-size: $small-font-size;
      color: $light-color;
      text-decoration: none;
    }
  }
}

/* TRANSITIONS */

// Add menu
.collapse-task-enter-active, .collapse-task-leave-active {
  transition: all .4s;
  transform: scaleY(1);
  max-height: 6rem;
  opacity: 1;
  transform-origin: top;
}
.collapse-task-enter, .collapse-task-leave-to {
  transform: scaleY(0);
  max-height: 0;
  opacity: 0;
}
</style>
