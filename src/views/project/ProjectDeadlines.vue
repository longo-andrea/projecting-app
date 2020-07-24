<template>
  <p-collapse>
    <p-collapse-item
      v-for="deadline in deadlines"
      :key="deadline.id"
      :title="deadline.date"
      :isActive="deadline.date === activeDeadline"
      @tabOpened="toggleActiveDeadline(deadline.date)">
      <template #content>
        <!-- add task button -->
        <div class="project-page__content__input-add-task">
          <p-button color="simple" size="xs" @buttonClicked="addTaskToDeadline(deadline.id)">
            <template #content>
              + Add a task
            </template>
          </p-button>
        </div>

        <deadline-tasks
          :tasks="getDeadlineTasks(deadline.id)"
          @edit-task="editTask"
          @delete-task="deleteTask" />
      </template>
    </p-collapse-item>
  </p-collapse>
</template>

<script>
// Components
import { PCollapse, PCollapseItem } from '@/components/collapse/index';
import PButton from '@/components/button/index';

// Sections
import DeadlineTasks from './DeadlineTasks.vue';

export default {
  name: 'ProjectDeadlines',
  components: {
    DeadlineTasks,
    PCollapse,
    PCollapseItem,
    PButton,
  },
  props: {
    deadlines: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeDeadline: null,
    };
  },
  methods: {
    toggleActiveDeadline(activeDeadline) {
      this.activeDeadline = activeDeadline;
    },
    addTaskToDeadline(deadlineId) {
      this.$emit('add-task-to-deadline', deadlineId);
    },
    getDeadlineTasks(deadlineId) {
      return this.tasks.filter((task) => task.deadlineId === deadlineId);
    },
    editTask(task) {
      this.$emit('edit-task', task);
    },
    deleteTask(taskId) {
      this.$emit('delete-task', taskId);
    },
  },
};
</script>

<style lang="scss">
</style>
