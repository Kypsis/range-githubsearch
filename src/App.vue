<template>
  <div id="app">
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
body {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.component-container {
  align-items: center;
  display: flex;
  flex-direction: column;
}

table {
  border-collapse: collapse;
}

tr {
  border-bottom: 1px solid lightgray;

  &:hover {
    background-color: #f5f5f5;
  }

  &:first-child:hover {
    background-color: white;
  }

  &:last-child {
    border-bottom: none;
  }
}

th {
  padding: 1em;
  text-align: left;
}

td {
  cursor: pointer;
  padding: 1em;
  text-align: left;
}
</style>
