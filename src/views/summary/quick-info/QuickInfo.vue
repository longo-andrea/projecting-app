<template>
  <p-card class="summary__content__summary">
      <template #header>
          <ul class="summary__content__summary__tab-links">
            <li
              class="summary__content__summary__tab-links__item"
              :class="{
                'summary__content__summary__tab-links__item--active': activeTab === 'WorkingOn'
              }"
              @click="toggleActiveTab('WorkingOn')">
              Working on
            </li>
            <li class="summary__content__summary__tab-links__item"
              :class="{
                'summary__content__summary__tab-links__item--active': activeTab === 'Deadlines'
              }"
              @click="toggleActiveTab('Deadlines')">
              Deadlines
            </li>
          </ul>
      </template>
      <template #content>
        <div class="summary__content__summary__tabs">
          <div v-show="activeTab === 'WorkingOn'" class="summary__content__summary__tabs__tab" id="workingon-tasks-list">
            <quick-task
              v-for="task in tasks"
              :key="task.id"
              :task="task" />
          </div>

          <div v-show="activeTab === 'Deadlines'" class="summary__content__summary__tabs__tab" id="incoming-deadlines-list">
            <quick-deadline
              v-for="deadline in deadlines"
              :key="deadline.id"
              :deadline="deadline" />
          </div>
        </div>
      </template>
  </p-card>
</template>

<script>
// Components
import PCard from '@/components/card/index';

// Sections
import QuickTask from './QuickTask.vue';
import QuickDeadline from './QuickDeadline.vue';

export default {
  name: 'QuickInfo',
  components: {
    QuickTask,
    QuickDeadline,
    PCard,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
    deadlines: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeTab: 'WorkingOn',
    };
  },
  methods: {
    toggleActiveTab(activeTab) {
      this.activeTab = activeTab;
    },
  },
};
</script>

<style lang="scss">
.summary__content__summary {
  height: 70%;

  overflow-y: hidden;

  .summary__content__summary__tab-links {
    display: flex;
    align-items: center;
    justify-content: space-around;

    .summary__content__summary__tab-links__item {
      font-weight: $font-bold;
      text-transform: uppercase;
      color: $lighter-color;

      list-style-type: none;

      &.summary__content__summary__tab-links__item--active {
        color: $base-color;
      }
    }
  }
}
</style>
