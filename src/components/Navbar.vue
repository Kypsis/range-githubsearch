<template>
  <div id="nav">
    <router-link to="/">Search</router-link>|
    <router-link to="/bookmarks">Bookmarks</router-link>
    <div v-if="bookmarks.length">({{ bookmarks.length }})</div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
  computed: {
    bookmarks: function() {
      return this.$store.state.bookmarks;
    }
  }
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
