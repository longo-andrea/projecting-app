<template>
  <div v-if="isReady" class="page project-page">
    <div class="project-page__header">
      <h2 class="page__title project-page__header__title">{{ project.name }}</h2>
      <h3 class="page__sub-title">{{ project.description }}</h3>
    </div>

    <div class="project-page__content">
      <p-box>
        <template #content>
          <div class="project-page__content__stats">
            <div class="project-page__content__stats__item">
              <div class="project-page__content__stats__item__title">Tasks</div>
              <div class="project-page__content__stats__item__value">{{ completedTasks.length }} / {{ projectTasks.length }}</div>
            </div>
            <div class="project-page__content__stats__item">
              <div class="project-page__content__stats__item__title">Deadlines</div>
              <div class="project-page__content__stats__item__value">{{ completedDeadlines.length }} / {{ projectDeadlines.length }}</div>
            </div>
          </div>
        </template>
      </p-box>

      <p-collapse>
        <p-collapse-item
          v-for="deadline in deadlinesDate"
          :key="deadline.id"
          :title="deadline.date"
          :isActive="deadline.date === activeCollapseItem"
          @tabOpened="toggleCollapseItem">
          <template #content>
          <div class="project-page__content__input-add-task">
            <p-button color="simple" size="xs" @buttonClicked="toggleAddTask(deadline.id)">
              <template #content>
                + Add a task
              </template>
            </p-button>
          </div>

            <p-box
              v-for="task in getDeadlineTasks(deadline.id)"
              :key="task.id">
              <template #header>
                {{ task.name }}
              </template>
              <template #content>
                {{ task.description }}
              </template>
            </p-box>
            <p v-if="getDeadlineTasks(deadline.id).length === 0">There are no tasks yet.</p>
          </template>
        </p-collapse-item>
      </p-collapse>
    </div>

    <p-modal v-if="tasks.addTaskIsOpen" class="project-page__add-task-panel">
      <template #header>
        <div class="project-page__add-task-panel__header">
          <h4 class="project-page__add-task-panel__header__title">Add task</h4>
          <img class="project-page__add-task-panel__header__icon" src="@/assets/img/close-icon.svg" alt="close" @click="toggleAddTask">
        </div>
      </template >
      <template #content>
        <form class="project-page__add-task-panel__form">
          <div class="project-page__add-task-panel__form__item">
            <label for="project-name" class="project-page__add-task-panel__form__item__label">
              <span class="project-page__add-task-panel__form__item__label__mandatory">*</span> Task name
            </label>
            <input id="project-name" type="text" v-model="tasks.addTaskName" class="project-page__add-task-panel__form__item__input-text" />
          </div>

          <div class="project-page__add-task-panel__form__item">
            <label for="project-description" class="project-page__add-task-panel__form__item__label">
              <span class="project-page__add-task-panel__form__item__label__mandatory">*</span> Task description
            </label>
            <textarea
              id="project-description"
              cols="30"
              rows="10"
              v-model="tasks.addTaskDescription"
              class="project-page__add-task-panel__form__item__input-textarea">
            </textarea>
          </div>

          <div class="project-page__add-task-panel__form__submit">
            <p-button @buttonClicked="toggleAddTask">
              <template #content>
                Cancel
              </template>
            </p-button>

            <p-button color="primary" @buttonClicked="addTask">
              <template #content>
                Add task
              </template>
            </p-button>
          </div>
        </form>
      </template >
    </p-modal>
  </div>
</template>

<script>
import PCollapse from '@/components/PCollapse.vue';
import PCollapseItem from '@/components/PCollapseItem.vue';
import PBox from '@/components/PBox.vue';
import PButton from '@/components/PButton.vue';
import PModal from '@/components/PModal.vue';

export default {
  name: 'Project',
  components: {
    PCollapse,
    PCollapseItem,
    PBox,
    PButton,
    PModal,
  },
  data() {
    return {
      projectId: this.$route.params.projectId,
      project: null,
      projectDeadlines: null,
      projectTasks: null,
      isReady: false,
      tasks: {
        addTaskIsOpen: false,
        addTaskToDeadline: null,
        addTaskName: null,
        addTaskDescription: null,
      },
      activeCollapseItem: null,
    };
  },
  computed: {
    deadlinesDate() {
      return this.projectDeadlines.map((deadline) => ({
        id: deadline.id,
        date: this.dateToString(new Date(deadline.date)),
      }));
    },
    completedTasks() {
      return this.projectTasks.filter((task) => task.completed);
    },
    completedDeadlines() {
      return this.projectDeadlines.filter((deadline) => deadline.completed);
    },
  },
  mounted() {
    const project = this.$store.getters['projects/getProject'](this.projectId);
    const projectDeadlines = this.$store.getters['deadlines/getProjectDeadlines'](this.projectId);
    const projectTasks = this.$store.getters['tasks/getProjectTasks'](this.projectId);

    this.project = project;
    this.projectDeadlines = projectDeadlines;
    this.projectTasks = projectTasks;
    this.isReady = true; // set project as ready to render its information
  },
  methods: {
    updateProjectTasks() {
      this.projectTasks = this.$store.getters['tasks/getProjectTasks'](this.projectId);
    },
    toggleCollapseItem(collapseTitle) {
      this.activeCollapseItem = collapseTitle;
    },
    toggleAddTask(deadlineId) {
      this.tasks.addTaskIsOpen = !this.tasks.addTaskIsOpen;

      if (this.tasks.addTaskIsOpen) {
        this.tasks.addTaskToDeadline = deadlineId;
      } else {
        this.tasks.addTaskToDeadline = null;
      }
    },
    getDeadlineTasks(deadlineId) {
      return this.projectTasks.filter((task) => task.deadlineId === deadlineId);
    },
    async addTask() {
      // generate a uniqe task id
      const taskId = await this.$store.dispatch('settings/generateUniqeId');

      this.$store.dispatch('tasks/addTask', {
        projectId: this.projectId,
        deadlineId: this.tasks.addTaskToDeadline,
        taskId,
        taskName: this.tasks.addTaskName,
        taskDescription: this.tasks.addTaskDescription,
      });

      this.updateProjectTasks(); // task list is updated
      this.tasks.addTaskIsOpen = false; // add task panel is closed
    },
    dateToString(date) {
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
.project-page {
  .project-page__header {
    margin-bottom: 1rem;

    .project-page__header__title {
        margin-left: 0;
        margin-bottom: 0;
    }
  }

  .project-page__add-task-panel {
    .project-page__add-task-panel__header {
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .project-page__add-task-panel__header__title {
        font-size: $medium-font-size;
        font-weight: $font-bold;
      }

      .project-page__add-task-panel__header__icon {
        width: 1rem;
      }
    }

    .project-page__add-task-panel__form {
      height: 100%;
      padding: 0 .5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .project-page__add-task-panel__form__item {
        max-height: 45%;
        margin: .5rem 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .project-page__add-task-panel__form__item__label {
          margin-bottom: .5rem;

          color: $light-color;

          .project-page__add-task-panel__form__item__label__mandatory {
            color: $danger-color;
          }
        }

        .project-page__add-task-panel__form__item__input-text {
          padding: .3rem;

          border: $dark-border;
          border-radius: $base-border-radius;
        }

        .project-page__add-task-panel__form__item__input-textarea {
          padding: .3rem;

          border: $dark-border;
          border-radius: $base-border-radius;

          resize: none;
        }
      }
      .project-page__add-task-panel__form__submit {
        width: 100%;
        margin-top: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .project-page__content {
    padding: 1rem 0;

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
  }
}
</style>
