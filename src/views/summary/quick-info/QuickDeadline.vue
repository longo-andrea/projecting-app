<template>
  <p-box
    class="summary__content__summary__tabs__tab__item">
    <template #header>
      {{ dateToString(deadline.date) }}
    </template>
    <template #content>
      {{ projectName }}
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
      projectName: '',
    };
  },
  mounted() {
    this.projectName = this.$store.getters['projects/getProjects']
      .find((project) => project.id === this.deadline.projectId).name;
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
  },
};
</script>

<style lang="scss">
</style>
