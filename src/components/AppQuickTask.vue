<template>
  <div>
    <el-row
      type="flex"
      align="middle">
      <el-col :span="2">
        <el-checkbox @change="completeTask(projectId, taskId)"/>
      </el-col>
      <el-col :span="22">
        <h1
          @click="toggleTask()"
          class="title">{{ name }}</h1>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="isDesktop || isTaskOpen">
      <el-divider />
        <p class="description">{{ description }}</p>
        <div class="task-infos">
          <p>{{ projectName }}</p>
          <p>{{ deadlineDate }}</p>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'AppQuickTask',
  props: {
    taskId: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    projectId: {
      type: Number,
      required: true,
    },
    deadlineId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isTaskOpen: false,
      isDesktop: false,
    };
  },
  computed: {
    projectName() {
      return this.$store.getters['projects/getProjects']
        .find((project) => project.id === this.projectId).name;
    },
    deadlineDate() {
      const taskDeadline = this.$store.getters['deadlines/getDeadlines']
        .find((deadline) => deadline.projectId === this.projectId && deadline.id === this.deadlineId);
      const deadlineDate = new Date(taskDeadline.date);
      const year = deadlineDate.getFullYear();
      const month = deadlineDate.getMonth();
      const day = deadlineDate.getDate();
      return `${year}/${month + 1}/${day}`;
    },
  },
  methods: {
    toggleTask() {
      this.isTaskOpen = !this.isTaskOpen;
    },
    completeTask(projectId, taskId) {
      this.$store.dispatch('tasks/setCompletedTask', { projectId, taskId, completed: true });
    },
  },
  mounted() {
    this.$nextTick(() => {
      if (window.innerWidth >= 768) {
        this.isDesktop = true;
      } else {
        this.isDesktop = false;
      }
    });
  },
};
</script>

<style scoped lang="scss">
.title {
  margin: 0;
}

.description {
  margin-top: 0;
}

.task-infos {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  color: $--lighter-text;

  p {
    margin-right: 1rem;
  }
}
</style>
