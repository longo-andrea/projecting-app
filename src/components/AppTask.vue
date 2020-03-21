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
          class="title title-task">{{ name }}</h1>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <div v-show="isTaskOpen">
      <el-divider />
        <p class="description">{{ description }}</p>
        <div class="task-infos">
          <p>{{ project }}</p>
          <p>{{ deadlineDate }}</p>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
export default {
  name: 'AppTask',
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
    project: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isTaskOpen: false,
    };
  },
  computed: {
    deadlineDate() {
      const date = new Date(this.deadline);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    },
  },
  methods: {
    toggleTask() {
      this.isTaskOpen = !this.isTaskOpen;
    },
    completeTask(projectId, taskId) {
      this.$store.commit('completeTask', { projectId, taskId });
    },
  },
};
</script>

<style scoped lang="scss">
.title-task {
  margin: 0;
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
