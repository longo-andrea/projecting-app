<template>
  <p-box>
    <template #content>
      <div class="project-page__content__stats">
        <div class="project-page__content__stats__item">
          <div class="project-page__content__stats__item__title">Tasks</div>
          <div class="project-page__content__stats__item__value">{{ completedTasksCount }} / {{ projectTasksCount }}</div>
        </div>
        <div class="project-page__content__stats__item">
          <div class="project-page__content__stats__item__title">Deadlines</div>
          <div class="project-page__content__stats__item__value">{{ completedDeadlinesCount }} / {{ projectDeadlinesCount }}</div>
        </div>
      </div>
    </template>
  </p-box>
</template>

<script>
import PBox from '@/components/box/index';

export default {
  name: 'ProjectStats',
  components: {
    PBox,
  },
  props: {
    projectTasksCount: {
      type: Number,
      required: true,
    },
    completedTasksCount: {
      type: Number,
      required: true,
    },
    projectDeadlinesCount: {
      type: Number,
      required: true,
    },
    completedDeadlinesCount: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss">
.project-page__content__stats {
  padding: 1.5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .project-page__content__stats__item {
    display: flex;
    flex-direction: column;
    align-items: center;

    .project-page__content__stats__item__title {
      font-weight: $font-semi-bold;
    }

    .project-page__content__stats__item__value {
      color: $light-color;
    }
  }
}
</style>
