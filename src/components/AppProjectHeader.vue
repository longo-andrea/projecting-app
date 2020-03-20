<template>
  <div>
    <h1 class="title">{{ projectName }}</h1>
    <h2 class="subtitle">{{ projectInfo }}</h2>
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
</style>
