<template>
  <div v-if="isReady">
    <h1>{{ project.name }}</h1>
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
export default {
  name: 'PPage',
  data() {
    return {
      projectId: this.$route.params.projectId,
      project: null,
      projectDeadlines: null,
      projectTasks: null,
      isReady: false,
      toAddTask: null,
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
  },
};
</script>

<style lang="scss">
</style>
