<template>
<div>
  <h1>Add project</h1>
  <form>
    <div>
      <label for="project-name">* Project name</label>
      <input id="project-name" type="text" v-model="projectName">
    </div>

    <div>
      <label for="project-description">* Project description</label>
      <textarea id="project-description" cols="30" rows="10" v-model="projectDescription">
      </textarea>
    </div>

    <div>
      <input type="submit" value="Add project" @click="addProject">
    </div>
  </form>
</div>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    return {
      projectName: null,
      projectDescription: null,
    };
  },
  methods: {
    addProject() {
      this.$store.dispatch('deadlines/addDeadline', { deadlineName: 'Name', deadlineDescription: 'Description' });
    },
  },
};
</script>

<style lang="scss">
</style>
