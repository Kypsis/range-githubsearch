<template>
  <div class="search">
    <h1>Search</h1>
    <div>
      <form @submit.prevent="submitSearch">
        <input
          v-model="searchTerm"
          @submit="submitSearch"
          placeholder="Search for repo"
        />
        <input type="submit" value="Search" />
      </form>
    </div>

    <div id="results-loading" v-if="loading">
      <div>Loading...</div>
    </div>
    <div id="results-list" v-if="!loading">
      <div v-for="result in results" :key="result.id">
        {{ result.full_name }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/* import HelloWorld from "@/components/HelloWorld.vue"; */

export default {
  name: "Search",
  components: {
    /* HelloWorld */
  },
  created: function() {
    this.$store.dispatch("fetchData", "studio");
  },
  data: () => ({
    searchTerm: ""
  }),
  computed: {
    results: function() {
      return this.$store.state.results;
    },
    loading: function() {
      return this.$store.state.loading;
    }
  },
  watch: {},
  methods: {
    submitSearch: function() {
      this.$store.dispatch("fetchData", this.searchTerm);
      this.searchTerm = "";
    }
  }
};
</script>
