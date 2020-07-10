<template>
  <div class="page summary">
    <div class="summary__content">

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
              <div v-show="activeTab === 'WorkingOn'" class="summary__content__summary__tabs__tab">
                <p-box
                  class="summary__content__summary__tabs__tab__item"
                  v-for="task in tasks"
                  :key="task.id">
                  <template #header>
                    {{ task.name }}
                  </template>
                  <template #content>
                    {{ task.description }}
                  </template>
                </p-box>
              </div>

              <div v-show="activeTab === 'Deadlines'" class="summary__content__summary__tabs__tab">
                <p-box
                  class="summary__content__summary__tabs__tab__item"
                  v-for="deadline in deadlines"
                  :key="deadline.id">
                  <template #header>
                    {{ deadline.date }}
                  </template>
                  <template #content>
                    {{ deadline.id }}
                  </template>
                </p-box>
              </div>
            </div>
          </template>
      </p-card>

      <div class="summary__content__projects-list">
        <p-box
          class="summary__content__projects-list__item"
          v-for="project in projects"
          :key="project.id">
          <template #header>
            {{ project.name }}
          </template>
          <template #content>
            {{ project.description }}
          </template>
        </p-box>
      </div>
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
        <li class="summary__add-menu__list__item">Add task</li>
      </ul>
    </div>
  </div>
</template>

<script>
import PCard from '@/components/PCard.vue';
import PBox from '@/components/PBox.vue';
import PButton from '@/components/PButton.vue';

export default {
  name: 'Summary',
  components: {
    PCard,
    PBox,
    PButton,
  },
  data() {
    return {
      projects: null,
      deadlines: null,
      tasks: null,
      activeTab: 'WorkingOn',
      isAddMenuOpen: false,
    };
  },
  mounted() {
    this.projects = this.$store.getters['projects/getProjects'];
    this.deadlines = this.$store.getters['deadlines/getDeadlines'];
    this.tasks = this.$store.getters['tasks/getTasks'];
  },
  methods: {
    toggleActiveTab(activeTab) {
      this.activeTab = activeTab;
    },
    toggleAddMenu() {
      this.isAddMenuOpen = !this.isAddMenuOpen;
    },
  },
};
</script>

<style lang="scss">
.summary {
  .summary__content {
    padding: 2rem .5rem;

    overflow-y: scroll;

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

      .summary__content__summary__tabs {
        .summary__content__summary__tabs__tab {
          .summary__content__summary__tabs__tab__item {
            margin: 1rem 0;
          }
        }
      }
    }

    .summary__content__projects-list {
      margin: 1rem 0;

      .summary__content__projects-list__item {
        margin: 1rem 0;
      }
    }
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
