<template>
  <div class="page home">
    <router-view />

    <div
      v-show="isInstallPromptOpen"
      class="login__install-banner"
      id="install">
      <div class="login__install-banner__header">
        <h2 class="login__install-banner__header__title">Projecting</h2>
        <span class="login__install-banner__header__close" @click="closeInstallBanner">
          <i class="fas fa-times"></i>
        </span>
      </div>
      <div class="login__install-banner__content">
        <img
          class="login__install-banner__content__logo"
          :src="require('@/assets/img/logo.png')"
          alt="THRON logo">

        <div class="login__install-banner__content__install">
          <h3>Do you want to add Projecting on your homepage?</h3>
          <p-button
            color="primary"
            @buttonClicked="install">
            <template #content>
              Install
            </template>
          </p-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PButton from '@/components/button/index';

export default {
  name: 'Home',
  components: {
    PButton,
  },
  data() {
    return {
      isInstallPromptOpen: true,
      installEvent: null,
    };
  },
  mounted() {
    // check if the user has previously rejected PWA install
    if (window.localStorage.getItem('pj-rejected-install') === null
      || window.localStorage.getItem('pj-rejected-install') !== 'true') {
      window.addEventListener('beforeinstallprompt', (e) => {
        // the install banner is shown
        this.isInstallPromptOpen = true;
        e.preventDefault();
        this.installEvent = e;
      });
    }
  },
  methods: {
    closeInstallBanner() {
      localStorage.setItem('pj-rejected-install', 'true');

      this.isInstallPromptOpen = false;
    },
    install() {
      // show add to homepage panel
      this.installEvent.prompt();

      this.installEvent.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'dismissed') {
          this.isInstallPromptOpen = false;
          window.localStorage.setItem('pj-rejected-install', 'true'); // to avoid that panel will be open next time
        }
      });
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
  width: 100%;

  .page {
    height: 100%;
    padding: .5rem;

    .page__title {
      margin: 1.5rem .5rem;

      font-size: $big-font-size;
      font-weight: $font-bold;
    }

    .page__sub-title {
      color: $light-color;
    }
  }
}

.login__install-banner {
  width: 100%;
  height: 40%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 1rem 1.3rem;

  background-color: #ffffff;
  border: $base-border;
  border-top-left-radius: $base-border-radius;
  border-top-right-radius: $base-border-radius;

  box-shadow: 0 0 8px rgba($base-color, .6);

  .login__install-banner__header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .login__install-banner__header__title {
      font-weight: $font-bold;
    }

    .login__install-banner__header__close {
      font-size: 1.3rem;
    }
  }

  .login__install-banner__content {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .login__install-banner__content__logo {
      max-width: 25%;
      max-height: 50%;
    }

    .login__install-banner__content__install {
      flex-basis: 60%;
      flex-grow: .5;
      display: flex;
      flex-direction: column;

      > * {
        margin: .5rem 0;
      }
    }
  }
}
</style>
