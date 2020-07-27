<template>
  <div v-if="isReady" class="page project-page">
    <project-header
      :project="project"
      :isSettingsOpen="isSettingsOpen"
      @toggle-settings="toggleSettings"
      @toggle-project-complete-state="toggleProjectCompleteState"
      @toggle-edit-project="toggleEditProjectPanel"
      @delete-project="deleteProject" />

    <div class="project-page__content">
      <project-stats
        :projectTasksCount="projectTasks.length"
        :completedTasksCount="completedTasks.length"
        :projectDeadlinesCount="projectDeadlines.length"
        :completedDeadlinesCount="completedDeadlines.length" />

      <project-deadlines
        :deadlines="deadlinesDate"
        :tasks="projectTasks"
        :isProjectCompleted="project.completed"
        @add-task-to-deadline='toggleAddTask' />
    </div>

    <!-- Add task panel -->
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
            <input type="text" v-model="tasks.addTaskName" class="project-page__add-task-panel__form__item__input-text" />
          </div>

          <div class="project-page__add-task-panel__form__item">
            <label for="project-description" class="project-page__add-task-panel__form__item__label">
              <span class="project-page__add-task-panel__form__item__label__mandatory">*</span> Task description
            </label>
            <textarea
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

    <!-- Edit project panel -->
    <p-modal v-show="editProject.isOpen" class="project-page__edit-project-panel">
      <template #header>
        <div class="project-page__edit-project-panel__header">
          <h4 class="project-page__edit-project-panel__header__title">Edit project</h4>
          <img
            class="project-page__edit-project-panel__header__icon"
            src="@/assets/img/close-icon.svg"
            alt="close"
            @click="toggleEditProjectPanel">
        </div>
      </template>
      <template #content>
        <form class="project-page__edit-project-panel__form">
          <div class="project-page__edit-project-panel__form__item">
            <label for="project-name" class="project-page__edit-project-panel__form__item__label">
              Project name
            </label>
            <input
              type="text"
              v-model="editProject.projectName"
              class="project-page__edit-project-panel__form__item__input-text" />
          </div>

          <div class="project-page__edit-project-panel__form__item">
            <label for="project-description" class="project-page__edit-project-panel__form__item__label">
              Project description
            </label>
            <textarea
              cols="30"
              rows="10"
              v-model="editProject.projectDescription"
              class="project-page__edit-project-panel__form__item__input-textarea">
            </textarea>
          </div>

          <div class="project-page__edit-project-panel__form__submit">
            <p-button @buttonClicked="toggleEditProjectPanel">
              <template #content>
                Cancel
              </template>
            </p-button>

            <p-button color="primary" @buttonClicked="editProjectInfo">
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
// Components
import PButton from '@/components/button/index';
import PModal from '@/components/modal/index';

// Sections
import ProjectHeader from './ProjectHeader.vue';
import ProjectStats from './ProjectStats.vue';
import ProjectDeadlines from './ProjectDeadlines.vue';

export default {
  name: 'Project',
  components: {
    ProjectHeader,
    ProjectStats,
    ProjectDeadlines,
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
      editProject: {
        isOpen: false,
        projectName: null,
        projectDescription: null,
      },
      tasks: {
        addTaskIsOpen: false,
        addTaskToDeadline: null,
        addTaskName: null,
        addTaskDescription: null,
      },
      isSettingsOpen: false,
    };
  },
  computed: {
    isProjectCompleted() {
      return this.project.completed;
    },
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

    // set project data for edit project form
    this.editProject.projectName = project.name;
    this.editProject.projectDescription = project.description;
  },
  methods: {
    toggleProjectCompleteState() {
      // all project's tasks are completed
      this.$store.dispatch('tasks/completeAllProjectTasks', { projectId: this.projectId });
      // then the project is completed
      this.$store.dispatch('projects/setCompletionState', { projectId: this.projectId, completed: !this.isProjectCompleted });
    },
    updateProjectTasks() {
      this.projectTasks = this.$store.getters['tasks/getProjectTasks'](this.projectId);
    },
    toggleSettings() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    toggleEditProjectPanel() {
      this.editProject.isOpen = !this.editProject.isOpen;
    },
    toggleAddTask(deadlineId) {
      this.tasks.addTaskIsOpen = !this.tasks.addTaskIsOpen;

      if (this.tasks.addTaskIsOpen) {
        this.tasks.addTaskToDeadline = deadlineId;
      } else {
        this.tasks.addTaskToDeadline = null;
      }
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
    editProjectInfo() {
      if (this.projectName !== ''
        && this.projectDescription !== '') {
        this.$store.dispatch('projects/setProjectName', { projectId: this.project.id, projectName: this.editProject.projectName });
        this.$store.dispatch('projects/setProjectDescription', {
          projectId: this.project.id,
          projectDescription: this.editProject.projectDescription,
        });

        this.editProject.isOpen = false;
      }
    },
    deleteProject() {
      this.$store.dispatch('deadlines/deleteProjectDeadlines', { projectId: this.projectId }); // all project's deadlines are deleted
      this.$store.dispatch('tasks/deleteProjectTasks', { projectId: this.projectId }); // all project's tasks are deleted
      this.$store.dispatch('projects/deleteProject', { projectId: this.projectId }); // then the project is deleted

      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.project-page {

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

  .project-page__edit-project-panel {
    .project-page__edit-project-panel__header {
      margin-bottom: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .project-page__edit-project-panel__header__title {
        font-size: $medium-font-size;
        font-weight: $font-bold;
      }

      .project-page__edit-project-panel__header__icon {
        width: 1rem;
      }
    }

    .project-page__edit-project-panel__form {
      height: 100%;
      padding: 0 .5rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .project-page__edit-project-panel__form__item {
        max-height: 45%;
        margin: .5rem 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;

        .project-page__edit-project-panel__form__item__label {
          margin-bottom: .5rem;

          color: $light-color;

          .project-page__edit-project-panel__form__item__label__mandatory {
            color: $danger-color;
          }
        }

        .project-page__edit-project-panel__form__item__input-text {
          padding: .3rem;

          border: $dark-border;
          border-radius: $base-border-radius;
        }

        .project-page__edit-project-panel__form__item__input-textarea {
          padding: .3rem;

          border: $dark-border;
          border-radius: $base-border-radius;

          resize: none;
        }
      }
      .project-page__edit-project-panel__form__submit {
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
  }
}
</style>
