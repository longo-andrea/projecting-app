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
        <p-roadmap :itemsList="projectDeadlines" class="add-project__form__item__roadmap">
          <template v-slot="item">
            <div class="add-project__form__item__roadmap__item">
              {{ dateToString(item.date) }}
              <span @click="removeDeadline(item.date)">
                <i class="fas fa-trash add-project__form__item__roadmap__item__icon"></i>
              </span>
            </div>
          </template>
        </p-roadmap>
      </div>

      <div class="add-project__form__submit">
        <p-button
          color="primary"
          :disabled="projectDeadlines.length === 0
            || projectName === ''
            || projectDescription === ''"
          @buttonClicked="addProject">
          <template #content>
            Create project
          </template>
        </p-button>
      </div>
    </form>
  </div>
</template>

<script>
import PRoadmap from '@/components/roadmap/index';
import PButton from '@/components/button/index';

export default {
  name: 'AddProject',
  components: {
    PRoadmap,
    PButton,
  },
  data() {
    return {
      projectName: '',
      projectDescription: '',
      projectDeadlines: [],
    };
  },
  methods: {
    async addProject() {
      if (this.projectName !== ''
        && this.projectDescription !== '') {
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

        this.$router.push('/homepage/summary');
      }
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
    removeDeadline(date) {
      this.projectDeadlines = this.projectDeadlines.filter((deadlineDate) => deadlineDate.date !== date);
    },
    dateToString(date) {
      const day = date.getDate();
      const month = date.getMonth();
      const year = date.getFullYear();

      const months = ['January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October', 'November', 'December'];

      return `${months[month]} ${day}, ${year}`;
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
          color: $danger-color;
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

      .add-project__form__item__roadmap {
        .add-project__form__item__roadmap__item {
          width: 100%;

          display: flex;
          align-items: center;
          justify-content: space-between;

          .add-project__form__item__roadmap__item__icon {
            width: 1rem;
          }
        }
      }
    }
    .add-project__form__submit {
      width: 70%;
      margin-left: auto;
      text-align: right;
    }
  }
}
</style>
