<template>
  <div class="homepage">
    <p-navbar />

    <div class="homepage__content">

      <p-card class="home__content__summary">
          <template #header>
              <ul class="home__content__summary__tab-links">
                <li
                  class="home__content__summary__tab-links__item"
                  :class="{
                    'home__content__summary__tab-links__item--active': activeTab === 'WorkingOn'
                  }"
                  @click="toggleActiveTab('WorkingOn')">
                  Working on
                </li>
                <li class="home__content__summary__tab-links__item"
                  :class="{
                    'home__content__summary__tab-links__item--active': activeTab === 'Deadlines'
                  }"
                  @click="toggleActiveTab('Deadlines')">
                  Deadlines
                </li>
              </ul>
          </template>
          <template #content>
            <div class="home__content__summary__tabs">
              <div v-show="activeTab === 'WorkingOn'" class="home__content__summary__tabs__tab">
                <p-box
                  class="home__content__summary__tabs__tab__item"
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

              <div v-show="activeTab === 'Deadlines'" class="home__content__summary__tabs__tab">
                <p-box
                  class="home__content__summary__tabs__tab__item"
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

      <ul>
        <h1>Projects</h1>
        <li v-for="project in projects" :key="project.id">
          <router-link :to="`project/${project.id}`">{{ project.name }}</router-link>
        </li>
      </ul>

      <ul>
        <h1>Deadlines</h1>
        <li v-for="deadline in deadlines" :key="deadline.id">
          {{ deadline.date }}
        </li>
      </ul>

      <ul>
        <h1>Tasks</h1>
        <li v-for="task in tasks" :key="task.id">
          {{ task.name }}
        </li>
      </ul>

      <router-link to="/addproject">Add a project</router-link>

      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime harum
      inventore debitis et ipsum rerum ullam quam dolores eligendi aspernatur eaque neque
       consectetur quidem cupiditate itaque, dolorem repellat illum incidunt?
    </div>
  </div>
</template>

<script>
import PNavbar from '@/components/PNavbar.vue';
import PCard from '@/components/PCard.vue';
import PBox from '@/components/PBox.vue';

export default {
  name: 'Homepage',
  components: {
    PNavbar,
    PCard,
    PBox,
  },
  data() {
    return {
      projects: null,
      deadlines: null,
      tasks: null,
      activeTab: 'WorkingOn',
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
  },
};
</script>

<style lang="scss">
.homepage {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 4rem auto;

  .homepage__content {
    padding: 2rem .5rem;

    overflow-y: scroll;

    .home__content__summary {
      height: 70%;

      overflow-y: hidden;

      .home__content__summary__tab-links {
        display: flex;
        align-items: center;
        justify-content: space-around;

        .home__content__summary__tab-links__item {
          font-weight: $font-bold;
          text-transform: uppercase;
          color: $lighen-color;

          list-style-type: none;

          &.home__content__summary__tab-links__item--active {
            color: $base-color;
          }
        }
      }

      .home__content__summary__tabs {
        .home__content__summary__tabs__tab {
          .home__content__summary__tabs__tab__item {
            margin: 1rem 0;
          }
        }
      }
    }
  }
}
</style>
