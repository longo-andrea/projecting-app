<template>
  <div>
    <el-row
      type="flex"
      align="middle">
      <el-col :span="12">
        <h1 class="deadline-title">{{ project }}</h1>
      </el-col>
      <el-col :span="12">
        <h2 class="deadline-date">{{ deadlineDate }}</h2>
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
  },
};
</script>

<style scoped lang="scss">
.deadline-title {
  color: $--title;
}

.deadline-date {
  color: $--subtitle;
}
</style>
