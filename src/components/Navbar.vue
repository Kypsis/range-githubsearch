<template>
  <div id="nav-container">
    <div id="nav-items">
      <router-link to="/">Search</router-link>
      <div id="nav-bookmarks">
        <router-link to="/bookmarks">Bookmarks</router-link>
        <div id="nav-placeholder">
          <div id="nav-badge" v-if="bookmarks.length">
            <b>{{ bookmarks.length }}</b>
          </div>
        </div>
      </div>
    </div>
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
#nav-badge {
  background-color: #405b77;
  border-radius: 10px;
  color: goldenrod;
  margin-left: 1em;
  padding: 0.3em;
  text-align: center;
  width: 1.2em;
}

#nav-bookmarks {
  display: flex;
  align-items: center;
  justify-content: left;
}

#nav-container {
  background-color: rgb(233, 233, 233);
  display: flex;
  justify-content: center;
  height: 5em;
}

#nav-items {
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 20em;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  #nav-placeholder {
    width: 2em;
  }
}
</style>
