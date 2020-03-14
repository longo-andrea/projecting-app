<template>
  <div>
    <router-link :to="'/project/' + id" class="project-title">
      <h1>{{ name }}</h1>
    </router-link>
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
    id: {
      type: Number,
      required: true,
    },
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
  text-decoration: none;
}
</style>
