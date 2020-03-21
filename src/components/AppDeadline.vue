<template>
  <div>
    <el-row
      type="flex"
      align="middle">
      <el-col :span="16">
        <h1 class="title">{{ project }}</h1>
        <p class="description">{{ deadlineDate }}</p>
      </el-col>
      <el-col :span="8">
        <h2 class="subtitle" :class="{ 'incoming-deadline-warning': incomingDeadline }">{{ daysToDeadline }}</h2>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'AppDeadline',
  props: {
    project: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    deadlineDate() {
      const date = new Date(this.date);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      return `${year}/${month}/${day}`;
    },
    daysToDeadline() {
      const deadlineDate = new Date(this.date);
      const currentDate = new Date(Date.now());
      const timeLeft = Math.abs(deadlineDate - currentDate);
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      return daysLeft > 1 ? `${daysLeft} days left` : `${daysLeft} day left`;
    },
    incomingDeadline() {
      const deadlineDate = new Date(this.date);
      const currentDate = new Date(Date.now());
      const timeLeft = Math.abs(deadlineDate - currentDate);
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));
      if (daysLeft <= 3) {
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped lang="scss">
.title {
  margin-bottom: 0;
}

.description {
  margin-top: 0;
}

.incoming-deadline-warning {
  color: $--danger;
}
</style>
