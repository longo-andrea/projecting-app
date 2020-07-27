<template>
  <div class="page summary">
    <div class="summary__content">
      <quick-info
        :tasks="workingOnTasks"
        :deadlines="incomingDeadlines" />

      <projects-list
        :uncompletedProjects="uncompletedProjects"
        :completedProjects="completedProjects" />
    </div>

    <p-button
      class="summary__button-add"
      color="primary"
      :rounded=true
      @buttonClicked="toggleAddMenu">
      <template #content>
        <img id="summary__add-button" src="@/assets/img/add-icon.svg" alt="Add">
      </template>
    </p-button>

    <div
      v-show="isAddMenuOpen"
      class="summary__add-menu">
      <ul class="summary__add-menu__list">
        <li class="summary__add-menu__list__item">
          <router-link to="addproject">Add a project</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Components
import PButton from '@/components/button/index';

// Sections
import QuickInfo from './quick-info/QuickInfo.vue';
import ProjectsList from './projects-list/ProjectsList.vue';

export default {
  name: 'Summary',
  components: {
    QuickInfo,
    ProjectsList,
    PButton,
  },
  data() {
    return {
      projects: [],
      deadlines: [],
      tasks: [],
      isAddMenuOpen: false,
    };
  },
  computed: {
    uncompletedProjects() {
      return this.projects
        .filter((project) => !project.completed);
    },
    completedProjects() {
      return this.projects
        .filter((project) => project.completed);
    },
    workingOnTasks() {
      return this.tasks
        .filter((task) => task.workingOn);
    },
    incomingDeadlines() {
      return this.deadlines
        .filter((deadline) => !deadline.completed);
    },
  },
  mounted() {
    this.projects = this.$store.getters['projects/getProjects'];
    this.deadlines = this.$store.getters['deadlines/getDeadlines'];
    this.tasks = this.$store.getters['tasks/getTasks'];
  },
  methods: {
    toggleAddMenu() {
      this.isAddMenuOpen = !this.isAddMenuOpen;
    },
  },
};
</script>

<style lang="scss">
.summary {
  .summary__content {
    height: 100%;
    padding: 2rem .5rem;

    overflow-y: scroll;
  }

  .summary__button-add {
    position: absolute;
    right: 1rem;
    bottom: 1.5rem;

    #summary__add-button {
      width: 1.5rem;
      height: 1.5rem;
    }
  }

  .summary__add-menu {
    position: absolute;
    bottom: 5rem; // navabr height defined on grid template
    right: 1rem;

    .summary__add-menu__list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .summary__add-menu__list__item {
        width: 8rem;
        margin: .3rem 0;
        padding: .4rem 0;

        background-color: #ffffff;
        box-shadow: 0 0 3px rgba($base-color, .5);

        font-style: italic;
        text-align: center;
        list-style-type: none;

        a {
          color: $base-color;
          text-decoration: none;
        }

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
