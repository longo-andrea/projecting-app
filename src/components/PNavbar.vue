<template>
  <div>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'PNavabr',
  methods: {
    logout() {
      this.$store.dispatch('settings/logout');

      // then the user will be redirected to login page
      this.$router.push('/login');
    },
  },
};
</script>

<style lang="scss">
</style>
