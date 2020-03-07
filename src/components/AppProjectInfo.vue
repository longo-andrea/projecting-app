<template>
  <div>
    <h1 class="project-title">{{ name }}</h1>
    <el-divider />
    <p
      v-for="(info, index) in infos"
      v-bind:key="index"
      class="project-info">
      {{ info }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'AppProjectInfo',
  props: {
    name: {
      type: String,
      required: true,
    },
    infos: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.project-title {
  margin: 0;
  font-size: 1.5rem;
  color: $--title;
}
</style>
