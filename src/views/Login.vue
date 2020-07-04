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
</style>
