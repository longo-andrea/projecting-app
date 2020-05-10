<template>
  <div>
    <div>
      <el-button @click="signOut()">
        Sign out
      </el-button>
      <h2 class="subtitle subtitle-settings">Project</h2>
      <p class="description descriptioon-settings">Max deadlines for a project</p>
      <el-input-number
        v-model="maxDeadlines"
        @change="updateMaxDeadlines"
        controls-position="right"
        :min="1"
        :max="6" />
    </div>
    <el-divider />
    <router-link to="/about" id="link-about">
      <h2 class="subtitle subtitle-settings">About</h2>
    </router-link>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Settings',
  data() {
    return {
      maxDeadlines: this.$store.getters['settings/getMaxDeadlinesForProject'],
    };
  },
  methods: {
    updateMaxDeadlines(maxDeadlinesCount) {
      this.$store.dispatch('settings/setMaxDeadlines', { maxDeadlinesCount });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          document.cookie = 'idToken=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
          this.$store.dispatch('settings/setUserLoggedIn', { isLoggedIn: false });
          this.$router.push('/login');
        }).catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.subtitle-settings {
  margin: 0;
  font-weight: $--font-bold;
}

#link-about {
  text-decoration: none;

  > .subtitle-settings {
    color: $--base-link;
  }
}

.descriptioon-settings {
  margin-top: 0;
  margin-bottom: 2rem;
}
</style>
