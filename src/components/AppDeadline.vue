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
        <h2 class="subtitle"
          :class="{ 'incoming-deadline-warning': incomingDeadline,
                  'incoming-deadline-danger': expiredDeadline }"
        >
          {{ daysToDeadline }}
        </h2>
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

      return `${year}/${month + 1}/${day}`;
    },
    daysToDeadline() {
      const deadlineDate = new Date(this.date);
      const currentDate = new Date(Date.now());
      let timeLeft = deadlineDate - currentDate;

      // if deadline date isn't still expired
      if (timeLeft > 0) {
        timeLeft = Math.abs(timeLeft);
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

        return daysLeft > 1 ? `${daysLeft} days left` : `${daysLeft} day left`;
      }

      // if deadline date is expired
      timeLeft = Math.abs(timeLeft);
      const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

      return daysLeft > 1 ? `${daysLeft} days ago` : `${daysLeft} day ago`;
    },
    incomingDeadline() {
      const deadlineDate = new Date(this.date);
      const currentDate = new Date(Date.now());
      const timeLeft = deadlineDate - currentDate;

      // check if deadline isn't still expired
      if (timeLeft > 0) {
        const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

        // if deadline expiration is less than 3 days
        if (daysLeft <= 3) {
          return true;
        }

        // if deadline expiration is more than 3 days
        return false;
      }

      // if deadline is expired
      return false;
    },
    expiredDeadline() {
      const deadlineDate = new Date(this.date);
      const currentDate = new Date(Date.now());
      const timeLeft = deadlineDate - currentDate;

      // if deadline is expired
      if (timeLeft < 0) {
        return true;
      }

      // if deadline isn't still expired
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
  color: $--warning;
}

.incoming-deadline-danger {
  color: $--danger;
}
</style>
