<template>
  <div v-if="isReady" class="page project-page">
    <div class="project-page__header">
      <h2 class="page__title project-page__header__title">{{ project.name }}</h2>
      <h3 class="page__sub-title">{{ project.description }}</h3>

      <div class="project-page__header__settings" :class="{ 'project-page__header__settings--open': isSettingsOpen }">
        <span @click="toggleSettings">
          <i class="fas fa-ellipsis-h project-page__header__settings__icon"></i>
        </span>

        <div v-show="isSettingsOpen" class="project-page__header__settings__list">
          <span @click="toggleProjectCompleteState">
            <i class="fa fa-check project-page__header__settings__icon"></i>
          </span>
          <span @click="toggleEditProjectPanel">
            <i class="fas fa-pen project-page__header__settings__icon"></i>
          </span>
          <span @click="deleteProject">
            <i class="fas fa-trash project-page__header__settings__icon"></i>
          </span>
        </div>
      </div>
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
              class="project-page__content__task-card"
              v-for="task in getDeadlineTasks(deadline.id)"
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
import { PCollapse, PCollapseItem } from '@/components/collapse/index';
import PButton from '@/components/button/index';
import PModal from '@/components/modal/index';

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
      editTask: {
        isOpen: false,
        taskName: null,
        taskDescription: null,
      },
      activeCollapseItem: null,
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
      this.$store.dispatch('projects/setCompletionState', { projectId: this.projectId, completed: !this.isProjectCompleted });
    },
    updateProjectTasks() {
      this.projectTasks = this.$store.getters['tasks/getProjectTasks'](this.projectId);
    },
    toggleCollapseItem(collapseTitle) {
      this.activeCollapseItem = collapseTitle;
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
    editProjectInfo() {
      this.$store.dispatch('projects/setProjectName', { projectId: this.project.id, projectName: this.editProject.projectName });
      this.$store.dispatch('projects/setProjectDescription', {
        projectId: this.project.id,
        projectDescription: this.editProject.projectDescription,
      });

      this.editProject.isOpen = false;
    },
    deleteProject() {
      this.$store.dispatch('projects/deleteProject', { projectId: this.projectId });

      this.$router.push('/');
    },
    setTaskCompleted(taskId, event) {
      this.$store.dispatch('tasks/setTaskCompleted', { taskId, completed: event.target.checked });
    },
    setTaskWorkingOn(taskId, event) {
      this.$store.dispatch('tasks/setTaskWorkingOn', { taskId, workingOn: event.target.checked });
    },
    editTaskInfo() {
      this.$store.dispatch('tasks/setTaskName', { taskId: this.editTask.taskId, taskName: this.editTask.taskName });
      this.$store.dispatch('tasks/setTaskDescription', {
        taskId: this.editTask.taskId,
        taskDescription: this.editTask.taskDescription,
      });

      this.editTask.isOpen = false;
    },
    deleteTask(taskId) {
      this.$store.dispatch('tasks/deleteTask', { taskId });
    },
  },
};
</script>

<style lang="scss">
.project-page {
  .project-page__header {
    margin-bottom: 1rem;
    position: relative;

    .project-page__header__title {
      margin-left: 0;
      margin-bottom: 0;
      padding-right: 2rem;
    }

    .project-page__header__settings {
      padding: 1rem .7rem;
      padding-top: 0;
      position: absolute;
      top: 0.2rem;
      right: 0;

      border: 1px solid transparent; // to avoid move effect on panel opening

      &.project-page__header__settings--open {
        background-color: #ffffff;
        border: $base-border;
        border-radius: $base-border-radius;
      }

      .project-page__header__settings__icon {
        margin: .7rem 0;

        font-size: 1.4rem;

        &:last-child {
          margin-bottom: 0;
        }
      }

      .project-page__header__settings__list {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
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
  }
}
</style>
