<template>
  <div>
    <el-row
      type="flex"
      align="middle">
      <el-col :span="2">
        <el-checkbox @change="completeTask(name)"/>
      </el-col>
      <el-col :span="22">
        <h1
          @click="toggleTask()"
          class="task-title">{{ name }}</h1>
      </el-col>
    </el-row>
    <div v-if="isTaskOpen">
    <el-divider />
      <h2 class="task-subtitle">{{ description }}</h2>
      <div class="task-infos">
        <p>{{ project }}</p>
        <p>{{ deadline }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppTask',
  props: {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
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
  methods: {
    toggleTask() {
      this.isTaskOpen = !this.isTaskOpen;
    },
    completeTask(name) {
      this.$store.commit('completeTask', name);
    },
  },
};
</script>

<style scoped lang="scss">
.task-title {
  margin: 0;
  font-size: 1.5rem;
  color: $--title;
}

.task-subtitle {
  margin-top: 1rem;
  font-size: 1rem;
  color: $--subtitle;
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
