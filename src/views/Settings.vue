<template>
  <div>
    <div class="settings-header">
      <h2 class="subtitle subtitle-settings subtitle-username">Hi {{ username }}</h2>
      <el-button
        @click="signOut()"
        class="button-signout">
        Sign out
      </el-button>
    </div>

    <el-divider />

    <div>
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
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Settings',
  data() {
    return {
      maxDeadlines: this.$store.getters['settings/getMaxDeadlinesForProject'],
      username: firebase.auth().currentUser.displayName,
    };
  },
  methods: {
    updateMaxDeadlines(maxDeadlinesCount) {
      this.$store.dispatch('settings/setMaxDeadlines', { maxDeadlines: maxDeadlinesCount });
    },
    signOut() {
      firebase
        .auth()
        .signOut();
      this.$store.dispatch('settings/setUserLoggedIn', { isLoggedIn: false });
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped lang="scss">
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.subtitle-settings {
  margin: 0;
  font-weight: $--font-bold;

  &.subtitle-username {
    font-size: 1.6rem;
  }
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
