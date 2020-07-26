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
            <span @click="toggleEditTask(task)">
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

    <p-modal v-show="editTask.isOpen" class="project-page__edit-task-panel">
      <template #header>
        <div class="project-page__edit-task-panel__header">
          <h4 class="project-page__edit-task-panel__header__title">Edit task</h4>
          <img
            class="project-page__edit-task-panel__header__icon"
            src="@/assets/img/close-icon.svg"
            alt="close"
            @click="toggleEditTask" />
        </div>
      </template>
      <template #content>
        <form class="project-page__edit-task-panel__form">
          <div class="project-page__edit-task-panel__form__item">
            <label for="project-name" class="project-page__edit-task-panel__form__item__label">
              Task name
            </label>
            <input
              type="text"
              v-model="editTask.taskName"
              class="project-page__edit-task-panel__form__item__input-text" />
          </div>

          <div class="project-page__edit-task-panel__form__item">
            <label for="project-description" class="project-page__edit-task-panel__form__item__label">
              Task description
            </label>
            <textarea
              cols="30"
              rows="10"
              v-model="editTask.taskDescription"
              class="project-page__edit-task-panel__form__item__input-textarea">
            </textarea>
          </div>

          <div class="project-page__edit-task-panel__form__submit">
            <p-button @buttonClicked="toggleEditTask">
              <template #content>
                Cancel
              </template>
            </p-button>

            <p-button color="primary" @buttonClicked="editTaskInfo">
              <template #content>
                Edit
              </template>
            </p-button>
          </div>
        </form>
      </template>
    </p-modal>
  </div>
</template>

<script>
import PBox from '@/components/box/index';
import PModal from '@/components/modal/index';
import PButton from '@/components/button/index';

export default {
  name: 'DeadlineTasks',
  components: {
    PBox,
    PModal,
    PButton,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      editTask: {
        isOpen: false,
        taskName: null,
        taskDescription: null,
      },
    };
  },
  methods: {
    toggleEditTask(task) {
      if (this.editTask.isOpen) {
        // if edit task's panel is open
        this.editTask.isOpen = false; // the panel is close

        // and task information are cleared
        this.editTask.taskId = null;
        this.editTask.taskName = null;
        this.editTask.taskDescription = null;
      } else {
        // otherwise, if panel is closed
        this.editTask.isOpen = true; // the panel is open

        // and task information are updated
        this.editTask.taskId = task.id;
        this.editTask.taskName = task.name;
        this.editTask.taskDescription = task.description;
      }
    },
    editTaskInfo() {
      if (this.editTask.taskName !== ''
        && this.editTask.taskDescription !== '') {
        this.$store.dispatch('tasks/setTaskName', { taskId: this.editTask.taskId, taskName: this.editTask.taskName });
        this.$store.dispatch('tasks/setTaskDescription', {
          taskId: this.editTask.taskId,
          taskDescription: this.editTask.taskDescription,
        });

        this.editTask.isOpen = false;
      }
    },
    deleteTask(taskId) {
      this.$store.dispatch('tasks/deleteTask', { taskId });
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

.project-page__edit-task-panel {
  .project-page__edit-task-panel__header {
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .project-page__edit-task-panel__header__title {
      font-size: $medium-font-size;
      font-weight: $font-bold;
    }

    .project-page__edit-task-panel__header__icon {
      width: 1rem;
    }
  }

  .project-page__edit-task-panel__form {
    height: 100%;
    padding: 0 .5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .project-page__edit-task-panel__form__item {
      max-height: 45%;
      margin: .5rem 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .project-page__edit-task-panel__form__item__label {
        margin-bottom: .5rem;

        color: $light-color;

        .project-page__edit-task-panel__form__item__label__mandatory {
          color: $danger-color;
        }
      }

      .project-page__edit-task-panel__form__item__input-text {
        padding: .3rem;

        border: $dark-border;
        border-radius: $base-border-radius;
      }

      .project-page__edit-task-panel__form__item__input-textarea {
        padding: .3rem;

        border: $dark-border;
        border-radius: $base-border-radius;

        resize: none;
      }
    }
    .project-page__edit-task-panel__form__submit {
      width: 100%;
      margin-top: auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
