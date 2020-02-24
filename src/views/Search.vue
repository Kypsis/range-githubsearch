<template>
  <div class="search">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

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

    <div>
      <div id="results-loading" v-if="loading">
        <div>Loading...</div>
      </div>
      <div id="results-list" v-if="!loading">
        <div v-if="results.length" id="results-header">
          <b>Repository name:</b>
          <b>Author:</b>
          <b>Amount of stars:</b>
          <b>Amount of forks:</b>
        </div>
        <div
          id="results-item"
          v-for="result in results"
          :key="result.id"
          @click.stop="linkToRepo(result.html_url)"
        >
          <div>{{ result.name }}</div>
          <div>{{ result.owner.login }}</div>
          <div>{{ result.stargazers_count }}</div>
          <div>{{ result.forks_count }}</div>
          <div @click.stop="addBookmark({ link: result.html_url })">
            Bookmark
          </div>
        </div>
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
  /* created: function() {
    this.$store.dispatch("fetchData", "studio");
  }, */
  data: () => ({
    searchTerm: ""
  }),
  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
    results: function() {
      return this.$store.state.results;
    }
  },
  watch: {},
  methods: {
    addBookmark: function(link) {
      this.$store.dispatch("addBookmark", link);
    },
    linkToRepo: function(link) {
      window.open(link, "_blank");
    },
    submitSearch: function() {
      this.$store.dispatch("fetchData", this.searchTerm);
      this.searchTerm = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#results-header {
  display: flex;
  justify-content: space-between;
  width: 50em;
}

#results-item {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
}

#results-list {
  display: flex;
  flex-direction: column;
  width: 50em;
}
</style>
