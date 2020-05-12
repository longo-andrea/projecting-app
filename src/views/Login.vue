<template>
  <div class="section section-signin">
    <img
      :src="require('../assets/img/logo.svg')"
      alt="Projecting"
      class="signin-logo">
    <button
      class="google-signin"
      @click="googleSignIn()">
      <img
        :src="require('../assets/img/google-logo.png')"
        alt=""
        class="google-signin-logo" />
      <span class="google-signin-messsage">
        Sign in With Google
      </span>
    </button>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  name: 'Login',
  methods: {
    googleSignIn() {
      const provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          this.$router.replace({ name: 'Home' });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.section-signin {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: $--light-background;

  .signin-logo {
    max-width: 40%;
  }
}

.google-signin {
  max-width: 85%;
  margin-top: 30%;
  padding: .7rem 1.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;

  background: #ffffff;
  border: none;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(#626262, .7);

  .google-signin-logo {
    max-width: 32px;
    margin-right: 1rem;
  }

  .google-signin-messsage {
    font-size: 1.3rem;
    color: #626262;
  }
}

@media screen and (orientation: landscape) and (max-width: 768px) {
  .section-signin {

    .signin-logo {
      max-width: 20%;
    }
  }

  .google-signin {
    margin-top: 3%;
  }
}

@media screen and (min-width: 768px) {
  .section-signin {

    .signin-logo {
      max-width: 25%;
    }
  }

  .google-signin {
    margin-top: 3%;
  }
}

@media screen and (min-width: 1024px) {
  .section-signin {

    .signin-logo {
      max-width: 15%;
    }
  }

  .google-signin {
    margin-top: 8%;
  }
}
</style>
