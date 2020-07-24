<template>
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
</template>

<script>
export default {
  name: 'ProjectHeader',
  props: {
    project: {
      type: Object,
      required: true,
    },
    isSettingsOpen: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleSettings() {
      this.$emit('toggle-settings');
    },
    toggleProjectCompleteState() {
      this.$emit('toggle-project-complete-state');
    },
    toggleEditProjectPanel() {
      this.$emit('toggle-edit-project');
    },
    deleteProject() {
      this.$emit('delete-project');
    },
  },
};
</script>

<style lang="scss">
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
</style>
