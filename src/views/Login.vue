<template>
  <div>
    <h1>Login</h1>
    <input type="submit" value="Login with Google" @click="loginWithGoogle">
  </div>
</template>

<script>
export default {
  name: 'Login',
  mounted() {
    this.$store.dispatch('settings/restoreUserSession')
      .then(() => {
        // if restoring happens successfully, then user will be redirected to homepage
        this.$router.push('/homepage');
      }).catch((error) => console.log(error));
  },
  methods: {
    loginWithGoogle() {
      this.$store.dispatch('settings/loginWithGoogle')
        .then(() => {
          // if login happens succesully, then user is redirected to homepage
          this.$router.push('/homepage');
        }).catch((error) => console.log(error));
    },
  },
};
</script>

<style lang="scss">
</style>
