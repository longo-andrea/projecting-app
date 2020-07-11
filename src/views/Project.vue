<template>
  <div v-if="isReady" class="page project-page">
    <div class="project-page__header">
      <h2 class="page__title project-page__header__title">{{ project.name }}</h2>
      <h3 class="page__sub-title">{{ project.description }}</h3>
    </div>

    <p-collapse>
      <p-collapse-item title="Tab1" :isActive="'Tab1' === activeCollapseItem" @tabOpened="toggleCollapseItem">
        <template #content>
          Content 1
        </template>
      </p-collapse-item>

      <p-collapse-item title="Tab2" :isActive="'Tab2' === activeCollapseItem" @tabOpened="toggleCollapseItem">
        <template #content>
          Content 2
        </template>
      </p-collapse-item>

      <p-collapse-item title="Tab3" :isActive="'Tab3' === activeCollapseItem" @tabOpened="toggleCollapseItem">
        <template #content>
          Content 3
        </template>
      </p-collapse-item>
    </p-collapse>

    <ul>
      <li v-for="deadline in projectDeadlines" :key="deadline.id">
        {{ deadline.date }}
      </li>
    </ul>
    <input type="text" v-model="toAddTask">
    <button  @click="addTask">Add task</button>
    <ul>
      <li v-for="task in projectTasks" :key="task.name">
        Hey
      </li>
    </ul>
  </div>
</template>

<script>
import PCollapse from '@/components/PCollapse.vue';
import PCollapseItem from '@/components/PCollapseItem.vue';

export default {
  name: 'Project',
  components: {
    PCollapse,
    PCollapseItem,
  },
  data() {
    return {
      projectId: this.$route.params.projectId,
      project: null,
      projectDeadlines: null,
      projectTasks: null,
      isReady: false,
      toAddTask: null,
      activeCollapseItem: null,
    };
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
    toggleCollapseItem(collapseTitle) {
      this.activeCollapseItem = collapseTitle;
    },
    async addTask() {
      // generate a uniqe task id
      const taskId = await this.$store.dispatch('settings/generateUniqeId');

      this.$store.dispatch('tasks/addTask', {
        projectId: this.projectId,
        deadlineId: this.projectDeadlines[0].id,
        taskId,
        taskName: this.toAddTask,
        taskDescription: 'Description of the task',
      });
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
}
</style>
