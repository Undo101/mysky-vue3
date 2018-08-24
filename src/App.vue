<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import './assets/css/index.scss'
export default {
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
  position: fixed;
  top: 0;
  background-color: rgba(52, 37, 82, .6);
  z-index: 10;
  a {
    font-weight: bold;
    color: #576777;
    &.router-link-exact-active {
      color: #6cc0c3;
    }
  }
}
</style>
