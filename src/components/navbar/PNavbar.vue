<template>
  <div class="navbar">
    <img
      class="navbar__logo"
      :src="require('@/assets/img/logo.svg')"
      alt="Projecting logo"
      @click="navigateHome" />

    <img
      class="navbar__settings-icon"
      :src="userThumbnailUrl"
      alt="settings"
      @click="toggleSettingsPanel" />

    <transition name="slide-from-right">
      <div
        v-show="isSettingsOpen"
        class="navbar__settings">
        <ul class="navbar__settings__list">
          <li class="navbar__settings__list__item" @click="logout">Logout</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'PNavabr',
  data() {
    return {
      isSettingsOpen: false,
      userThumbnailUrl: null,
    };
  },
  mounted() {
    this.userThumbnailUrl = this.$store.getters['settings/getUserSession'].photoURL;
  },
  methods: {
    navigateHome() {
      this.$router.push('/homepage/summary').catch(() => {});
    },
    toggleSettingsPanel() {
      this.isSettingsOpen = !this.isSettingsOpen;
    },
    logout() {
      this.$store.dispatch('settings/logout');

      // then the user will be redirected to login page
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
.navbar {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: .5rem 1rem;

  background-color: $primary-color;
  box-shadow: 0 0 8px rgba($base-color, .5);

  .navbar__logo {
    height: 100%;
  }

  .navbar__settings-icon {
    height: 100%;

    border-radius: 100%;
  }

  .navbar__settings {
    position: absolute;
    z-index: 999;
    top: 4rem; // navabr height defined on grid template
    right: 1rem;

    .navbar__settings__list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;

      .navbar__settings__list__item {
        width: 6rem;
        margin: .3rem 0;
        padding: .4rem 0;

        background-color: #ffffff;
        box-shadow: 0 0 3px rgba($base-color, .5);

        font-style: italic;
        text-align: center;
        list-style-type: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* TRANSITIONS */

// Settings menu
.slide-from-right-enter-active, .slide-from-right-leave-active {
  transition: all .4s;
  transform: translateX(none);
}
.slide-from-right-enter, .slide-from-right-leave-to {
  transform: translateX(150%);
}
</style>
