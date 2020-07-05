<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  font-family: $font-family;
  font-weight: $font-regular;
  color: $base-color;
}

html, body {
  width: 100%;
  height: 100%;

  font-size: $base-font-size;

  overflow-x: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>
