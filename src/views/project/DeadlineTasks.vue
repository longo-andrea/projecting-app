<template>
  <div>
    <p-box
      class="project-page__content__task-card"
      v-for="task in tasks"
      :key="task.id">
      <template #header>
        <div class="project-page__content__task-card__header">
          <h4 class="project-page__content__task-card__header__title">{{ task.name }}</h4>

          <div class="project-page__content__task-card__header__buttons">
            <span @click="editTask(task)">
              <i class="fas fa-pen project-page__content__task-card__header__buttons__button"></i>
            </span>
            <span @click="deleteTask(task.id)">
              <i class="fas fa-trash project-page__content__task-card__header__buttons__button"></i>
            </span>
          </div>
        </div>
      </template>
      <template #content>
        <div class="project-page__content__task-card__content">
          <p class="project-page__content__task-card__content__description">
            {{ task.description }}
          </p>
          <div class="project-page__content__task-card__content__buttons">
            <span class="project-page__content__task-card__content__buttons__button">
              <input
                type="checkbox"
                :id="task.id + 'completed'"
                :checked="task.completed"
                @change="setTaskCompleted(task.id, $event)">
              <label :for="task.id + 'completed'">Completed</label>
            </span>
            <span class="project-page__content__task-card__content__buttons__button">
              <input
                type="checkbox"
                :id="task.id + 'working-on'"
                :checked="task.workingOn"
                @change="setTaskWorkingOn(task.id, $event)">
              <label :for="task.id + 'working-on'">Working on</label>
            </span>
          </div>
        </div>
      </template>
    </p-box>
    <p v-if="tasks.length === 0">There are no tasks yet.</p>
  </div>
</template>

<script>
import PBox from '@/components/box/index';

export default {
  name: 'DeadlineTasks',
  components: {
    PBox,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  methods: {
    editTask(task) {
      this.$emit('edit-task', task);
    },
    deleteTask(taskId) {
      this.$emit('delete-task', taskId);
    },
    setTaskCompleted(taskId, event) {
      this.$store.dispatch('tasks/setTaskCompleted', { taskId, completed: event.target.checked });
    },
    setTaskWorkingOn(taskId, event) {
      this.$store.dispatch('tasks/setTaskWorkingOn', { taskId, workingOn: event.target.checked });
    },
  },
};
</script>

<style lang="scss">
.project-page__content__task-card {
  .project-page__content__task-card__header {
    position: relative;

    .project-page__content__task-card__header__title{
      padding-right: 4rem;

      font-size: $medium-font-size;
    }

    .project-page__content__task-card__header__buttons {
      position: absolute;
      top: 0;
      right: 0;

      .project-page__content__task-card__header__buttons__button {
        width: 1rem;
        margin-left: 1rem;
      }
    }
  }

  .project-page__content__task-card__content {
    .project-page__content__task-card__content__buttons {
      margin-top: 1.5rem;
      margin-bottom: -1rem;
      padding-top: 1rem;
      padding-bottom: .5rem;
      display: flex;
      align-items: center;
      justify-content: space-around;

      border-top: $base-border;

      .project-page__content__task-card__content__buttons__button {
        display: flex;
        align-items: center;

        input {
          margin-right: .7rem;
        }

        label {
          font-size: $small-font-size;
          font-weight: $font-semi-bold;
          color: $light-color;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>
