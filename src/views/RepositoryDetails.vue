<template>
  <div class="component-container">
    <h1>Details Page</h1>
    <table>
      <tr>
        <th>Repository name:</th>
        <th>Author:</th>
        <th>Stars:</th>
        <th>Forks:</th>
      </tr>
      <tr>
        <td>{{ repositoryDetails.name }}</td>
        <td>{{ repositoryDetails.owner && repositoryDetails.owner.login }}</td>
        <td>⭐{{ repositoryDetails.stargazers_count }}</td>
        <td>🔀{{ repositoryDetails.forks_count }}</td>
      </tr>
    </table>

    <Loader v-if="loading" />
    <VueMarkdown
      v-if="readme.length"
      id="details-markdown"
      :source="readme"
    ></VueMarkdown>
  </div>
</template>

<script>
import Loader from "@/components/Loader.vue";
import VueMarkdown from "vue-markdown-v2";

export default {
  name: "RepositoryDetails",
  components: { Loader, VueMarkdown },
  mounted: function() {
    if (!this.slug) {
      this.$router.replace("/");
    }
    this.$store.dispatch("fetchRepository", this.slug);
    this.$store.dispatch("fetchReadme", this.slug);
  },
  destroyed: function() {
    this.$store.dispatch("clearReadme");
  },
  computed: {
    loading: function() {
      return this.$store.state.loading;
    },
    readme: function() {
      return this.$store.state.readme.substring(0, 1500);
    },
    repositoryDetails: function() {
      return this.$store.state.repositoryDetails;
    },
    slug: function() {
      return this.$route.params.slug;
    }
  }
};
</script>

<style lang="scss" scoped>
#details-markdown {
  border: 1px solid gray;
  margin-top: 2em;
  padding: 1em;
}

tr:hover {
  background-color: white;
}
</style>
