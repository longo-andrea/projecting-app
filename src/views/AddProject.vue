<template>
  <div class="page add-projet">
    <h1 class="page__title">Add project</h1>
    <form class="add-project__form">
      <div class="add-project__form__item">
        <label for="project-name" class="add-project__form__item__label">
          <span class="add-project__form__item__label__mandatory">*</span> Project name
        </label>
        <input id="project-name" type="text" v-model="projectName" class="add-project__form__item__input-text" />
      </div>

      <div class="add-project__form__item">
        <label for="project-description" class="add-project__form__item__label">
          <span class="add-project__form__item__label__mandatory">*</span> Project description
        </label>
        <textarea id="project-description" cols="30" rows="10" v-model="projectDescription" class="add-project__form__item__input-textarea">
        </textarea>
      </div>

      <div class="add-project__form__item">
        <label for="project-description" class="add-project__form__item__label">
          <span class="add-project__form__item__label__mandatory">*</span> Deadlines
        </label>
        <input type="date" @change="addProjectDeadline"  class="add-project__form__item__input-date" />
      </div>

      <div class="add-project__form__item">
        <p-roadmap :itemsList="projectDeadlines">
          <template v-slot="item">
            {{ new Date(item.date).toISOString() }}
          </template>
        </p-roadmap>
      </div>

      <div class="add-project__form__item">
        <input type="submit" value="Add project" @click="addProject" class="add-project__form__item__submit">
      </div>
    </form>
  </div>
</template>

<script>
import PRoadmap from '@/components/PRoadmap.vue';

export default {
  name: 'AddProject',
  components: {
    PRoadmap,
  },
  data() {
    return {
      projectName: null,
      projectDescription: null,
      projectDeadlines: [],
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
    addProjectDeadline(event) {
      this.projectDeadlines.push({
        date: new Date(event.target.value),
      });

      // then date input is cleared
      /* eslint-disable no-param-reassign */
      event.target.value = '';

      // sort project deadlines by date
      this.projectDeadlines.sort((firstDeadline, secondDeadline) => firstDeadline.date - secondDeadline.date);
    },
  },
};
</script>

<style lang="scss">
.add-projet {
  height: 100%;

  .add-project__form {
    padding: 0 .5rem;

    .add-project__form__item {
      margin: 1rem 0;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;

      .add-project__form__item__label {
        margin-bottom: .5rem;

        color: $light-color;

        .add-project__form__item__label__mandatory {
          color: $danger;
        }
      }

      .add-project__form__item__input-text {
        padding: .3rem;

        border: $dark-border;
        border-radius: $base-border-radius;
      }

      .add-project__form__item__input-textarea {
        padding: .3rem;

        border: $dark-border;
        border-radius: $base-border-radius;

        resize: none;
      }

      .add-project__form__item__input-date {
        width: 100%;
        padding: .3rem;

        border: $dark-border;
        border-radius: $base-border-radius;
      }
    }

    .add-project__form__list {
      padding-left: 2rem;
    }
  }
}
</style>
