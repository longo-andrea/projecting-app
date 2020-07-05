<template>
<div>
  <h1>Add project</h1>
  <form>
    <div>
      <label for="project-name">* Project name</label>
      <input id="project-name" type="text" v-model="projectName" />
    </div>

    <div>
      <label for="project-description">* Project description</label>
      <textarea id="project-description" cols="30" rows="10" v-model="projectDescription">
      </textarea>
    </div>

    <div>
      <input type="date" v-model="selectedDate" />
      <input type="submit" value="Add" @click="addProjectDeadline">
    </div>

    <div>
      <input type="submit" value="Add project" @click="addProject">
    </div>
  </form>

  <div>
    <h2>Deadlines list</h2>
    <ul>
      <li v-for="(deadline, index) in projectDeadlines" :key="index">
        {{ deadline.date }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  name: 'AddProject',
  data() {
    return {
      projectName: null,
      projectDescription: null,
      projectDeadlines: [],
      selectedDate: null,
    };
  },
  methods: {
    async addProject() {
      // generate an id used as project's id
      const uniqeId = await this.$store.dispatch('settings/generateUniqeId');

      this.$store.dispatch('projects/addProject', {
        projectId: uniqeId,
        projectName: this.projectName,
        projectDescription: this.projectDescription,
      });

      this.projectDeadlines.forEach(async (deadline) => {
        const deadlineId = await this.$store.dispatch('settings/generateUniqeId');

        this.$store.dispatch('deadlines/addDeadline', {
          projectId: uniqeId,
          deadlineId,
          deadlineDate: deadline.date,
        });
      });
    },
    addProjectDeadline() {
      this.projectDeadlines.push({
        date: new Date(this.selectedDate),
      });

      // sort project deadlines by date
      this.projectDeadlines.sort((firstDeadline, secondDeadline) => firstDeadline.date - secondDeadline.date);
    },
  },
};
</script>

<style lang="scss">
</style>
