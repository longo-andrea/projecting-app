<template>
  <div>
    <router-link :to="'/project/' + id" class="title-project">
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
.title-project {
  text-decoration: none;
}
</style>
