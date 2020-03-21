<template>
  <div class="deadlines-list">
    <el-card
      v-for="deadline in incomingDeadlines"
      v-bind:key="deadline.id"
      class="deadline-item"
      shadow="hover">
      <app-deadline
        v-bind:project="deadline.projectName"
        v-bind:date="deadline.deadlineDate" />
    </el-card>
  </div>
</template>

<script>
import AppDeadline from './AppDeadline.vue';

export default {
  name: 'AppDeadlinesList',
  components: {
    AppDeadline,
  },
  computed: {
    incomingDeadlines() {
      return this.$store.getters.getIncomingDeadlines;
    },
  },
};
</script>

<style scoped lang="scss">
.deadlines-list {
  max-height: 70vh;
  overflow: scroll;
  overflow-x: hidden;

  .deadline-item {
    margin-bottom: 1.2rem;
  }
}

@media screen and (min-width: $--md-screen) {
  .deadlines-list {
    height: 30vh;
    display: flex;
    flex-wrap: wrap;

    .deadline-item {
      margin-left: 2.5%;
      margin-right: 2.5%;
      flex-basis: 45%;
    }
  }
}

@media screen and (min-width: $--bg-screen) {
  .deadlines-list {
    height: 60vh;
  }
}
</style>
