<template>
  <div class="component-container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <Toast v-if="showToast" />

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
      <!-- <div id="search-loading" v-if="loading">
        <div>Loading...</div>
      </div>-->
      <Loader v-if="loading" />
      <table v-if="!loading">
        <tr v-if="results.length">
          <th>Repository name:</th>
          <th>Author:</th>
          <th>Stars:</th>
          <th>Forks:</th>
          <th></th>
        </tr>
        <tr
          v-for="result in results"
          :key="result.id"
          @click.stop="linkToRepo(result.full_name)"
        >
          <td>{{ result.name }}</td>
          <td>{{ result.owner.login }}</td>
          <td>⭐{{ result.stargazers_count }}</td>
          <td>🔀{{ result.forks_count }}</td>
          <td>
            <div
              id="search-bookmark"
              @click.stop="
                addBookmark({ link: result.html_url, slug: result.full_name })
              "
            >
              Bookmark
            </div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Toast from "@/components/Toast.vue";
import Loader from "@/components/Loader.vue";

export default {
  name: "Search",
  components: {
    Loader,
    Toast
  },
  data: () => ({
    searchTerm: ""
  }),
  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
    results: function() {
      return this.$store.state.results;
    },
    showToast: function() {
      return this.$store.state.showToast;
    }
  },
  watch: {},
  methods: {
    addBookmark: function(linkObject) {
      this.$store.dispatch("addBookmark", linkObject);
    },
    linkToRepo: function(slug) {
      this.$router.push({
        name: "RepositoryDetails",
        params: {
          slug
        }
      });
    },
    submitSearch: function() {
      this.$store.dispatch("searchForRepositories", this.searchTerm);
      this.searchTerm = "";
    }
  }
};
</script>

<style lang="scss" scoped>
input {
  margin-bottom: 2em;
  padding: 0.5em;
}

#search-bookmark {
  background-color: #3a8a5e;
  border-radius: 5px;
  color: white;
  padding: 0.4em;
  text-align: center;

  &:hover {
    background-color: #256b45;
  }
}
</style>
