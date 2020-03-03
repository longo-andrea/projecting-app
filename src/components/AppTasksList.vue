<template>
  <div>
    <el-card class="card"
      v-for="task in workingTasks"
      :key="task.name"
      shadow="hover">
      <div>
        <el-checkbox>
          <h1 class="card-title">{{ task.name }}</h1>
        </el-checkbox>
        <el-divider />
        <h2 class="card-subtitle">{{ task.description }}</h2>
        <div class="card-infos">
          <p>{{ task.project }}</p>
          <p>{{ task.deadline }}</p>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'AppTasksList',
  data() {
    return {
      completedTask: [],
    };
  },
  computed: {
    workingTasks() {
      return this.$store.state.workingOnTasks;
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  margin-bottom: 1.2rem;

  .card-title {
    margin: 0;
    font-size: 1.5rem;
    color: $--title;
  }

  .card-subtitle {
    margin-top: 1rem;
    font-size: 1rem;
    color: $--subtitle;
  }

  .card-infos {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    color: $--lighter-text;

    p {
      margin-right: 1rem;
    }
  }
}
</style>
