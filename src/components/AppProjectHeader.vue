<template>
  <div>
    <h1 class="project-title">{{ projectName }}</h1>
    <h2 class="project-info">{{ projectInfo }}</h2>
  </div>
</template>

<script>
export default {
  name: 'AppProject',
  props: {
    projectName: {
      type: String,
      required: true,
    },
    projectInfo: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.project-title {
  margin-bottom: 0;
  font-size: 2rem;
  color: $--title;
}
.project-info {
  margin-top: 0;
  font-size: 1.4rem;
  color: $--subtitle
}
</style>
