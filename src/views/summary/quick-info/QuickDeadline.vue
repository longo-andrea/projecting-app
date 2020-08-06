<template>
  <p-box
    class="summary__content__summary__tabs__tab__item">
    <template #header>
      <div class="summary__content__summary__tabs__tab__item__header">
        {{ dateToString(deadline.date) }}
        <p
          class="summary__content__summary__tabs__tab__item__header__info"
          :class="[
            daysLeft < 5 && daysLeft >= 0 ? 'summary__content__summary__tabs__tab__item__header__info--warning' : '',
            daysLeft < 0 ? 'summary__content__summary__tabs__tab__item__header__info--danger  ' : '',
          ]">
          {{ getDaysLeftString() }}
        </p>
      </div>
    </template>
    <template #content>
      <div class="summary__content__summary__tabs__tab__item__content">
        <router-link :to="`project/${project.id}`"
          class="summary__content__summary__tabs__tab__item__content__info">
          {{ project.name }}
        </router-link>
      </div>
    </template>
  </p-box>
</template>

<script>
import PBox from '@/components/box/index';

export default {
  name: 'QuickDeadline',
  components: {
    PBox,
  },
  props: {
    deadline: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      project: {},
      daysLeft: 0,
    };
  },
  mounted() {
    this.project = this.$store.getters['projects/getProjects']
      .find((project) => project.id === this.deadline.projectId);

    this.setDaysLeft();
  },
  methods: {
    dateToString(deadlineDate) {
      const date = new Date(deadlineDate);

      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      return `${months[month]} ${day}, ${year}`;
    },
    /* eslint-disable consistent-return */
    getDaysLeftString() {
      if (this.daysLeft === 1) {
        return `${this.daysLeft} day left`;
      }

      if (this.daysLeft >= 0) {
        return `${this.daysLeft} days left`;
      }

      if (this.daysLeft === -1) {
        return `${Math.abs(this.daysLeft)} day ago`;
      }

      if (this.daysLeft < -1) {
        return `${Math.abs(this.daysLeft)} days ago`;
      }
    },
    setDaysLeft() {
      const deadlineDate = new Date(this.deadline.date);
      const currentDate = new Date(Date.now());

      const timeLeft = deadlineDate - currentDate;

      this.daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
    },
  },
};
</script>

<style lang="scss">
.summary__content__summary__tabs__tab__item {
  .summary__content__summary__tabs__tab__item__header {
    .summary__content__summary__tabs__tab__item__header__info {
      font-size: .7rem;
      font-weight: $font-bold;
      color: $light-color;
      text-transform: uppercase;

      &.summary__content__summary__tabs__tab__item__header__info--warning {
        color: $warning-color;
      }
      &.summary__content__summary__tabs__tab__item__header__info--danger {
        color: $danger-color;
      }
    }
  }
}
</style>
