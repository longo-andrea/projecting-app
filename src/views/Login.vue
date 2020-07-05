<template>
  <div class="login">
    <img
      class="login__logo"
      :src="require('@/assets/img/logo.svg')"
      alt="Projecting logo">

    <h1 class="login__title">Projecting</h1>

    <div class="login__button">
      <input
        class="login__button"
        type="submit"
        value="Login with Google"
        @click="loginWithGoogle">
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    this.$store.dispatch('settings/restoreUserSession')
      .then(async () => {
        // init current user state
        await this.$store.dispatch('projects/initState'); // projects init
        await this.$store.dispatch('deadlines/initState'); // deadlines init
        await this.$store.dispatch('tasks/initState'); // tasks init

        // if restoring happens successfully, then user will be redirected to homepage
        this.$router.push('/homepage');
      }).catch((error) => console.log(error));
  },
  methods: {
    loginWithGoogle() {
      this.$store.dispatch('settings/loginWithGoogle')
        .then(() => {
          // init current user state
          this.$store.dispatch('projects/initState'); // projects init
          this.$store.dispatch('deaedlines/initState'); // deadlines init
          this.$store.dispatch('tasks/initState'); // tasks init

          // if login happens succesully, then user is redirected to homepage
          this.$router.push('/homepage');
        }).catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: $primary-color;

  .login__logo {
    flex-basis: 40%;
    margin-top: 20%;
  }

  .login__title {
    flex-basis: 20%;
    margin-bottom: auto;

    font-size: 2rem;
    font-style: italic;
  }

  .login__button {
    flex-basis: 20%;

    input {
      padding: 1rem;
      padding-left: 3rem;

      background:  url('../assets/img/google_logo.svg');
      background-repeat: no-repeat;
      background-size: 2.5rem auto;
      background-position: .5rem center;
      background-color: #ffffff;
      border: 1px solid #ededed;
      border-radius: 1.5rem;

      font-weight: $font-semi-bold;
      font-size: 1.1rem;
      color: #808080;
    }
  }
}
</style>
