<template>
  <div id="nav">
    <router-link to="/">Search</router-link>|
    <router-link to="/bookmarks">Bookmarks</router-link>
  </div>
</template>

<script>
export default {
  name: "Navbar"
};
</script>

<style lang="scss" scoped>
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
