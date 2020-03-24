<template>
  <div>
    <router-link :to="'/project/' + id" class="project-link">
      <h1 class="title">{{ name }}</h1>
    </router-link>
    <el-divider />
    <p
      v-for="(info, index) in infos"
      v-bind:key="index"
      class="description">
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
.project-link {
  text-decoration: none;
}

.title {
  margin: 0;
}

.description {
  margin: 0;
}
</style>
